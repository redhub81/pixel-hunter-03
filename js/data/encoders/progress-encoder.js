/** @module data/encoders/progress-encoder */

const getFieldData = (value, length, char = `0`) => {
  let strValue = value.toString();
  if (strValue.length === length) {
    return strValue;
  }
  if (strValue.length < length) {
    strValue = `${(new Array(1 + length - strValue.length)).join(char)}${strValue}`;
  }
  return strValue.slice(-length);
};

const playerNameFieldEncoder = {
  name: `player.name`,
  encode: (data) => `${data}|`,
  decode: (code) => {
    const parts = code.split(`|`);
    return {
      code: parts[1],
      data: parts[0]
    };
  }
};

const livesFieldEncoder = {
  name: `livesCount`,
  itemSize: 1,
  encode: (data) => getFieldData(data < 0 ? `N` : data, livesFieldEncoder.itemSize),
  decode: (code) => {
    const field = code.substr(0, livesFieldEncoder.itemSize);
    const data = field === `N` ? -1 : parseInt(field, 10);
    return {
      code: code.substr(livesFieldEncoder.itemSize),
      data,
    };
  }
};

const answersFieldEncoder = {
  name: `answers`,
  headSize: 2,
  itemSize: 1,
  encode: (data) => `\
${getFieldData(data.length, answersFieldEncoder.headSize)}\
${data.map((it) => getFieldData(it, answersFieldEncoder.itemSize)).join(``)}`,
  decode: (code) => {
    const head = code.substr(0, answersFieldEncoder.headSize);
    code = code.substr(answersFieldEncoder.headSize);
    const length = parseInt(head, 10);
    const data = new Array(length).fill(null)
        .map(() => {
          const value = parseInt(code.substr(0, answersFieldEncoder.itemSize), 10);
          code = code.substr(answersFieldEncoder.itemSize);
          return value;
        });
    return {code, data};
  }
};

const gameProgressFieldsEncoders = [playerNameFieldEncoder, livesFieldEncoder, answersFieldEncoder];

export const gameProgressEncoder = {
  encode: (data, includeName = true) => {
    const fields = gameProgressFieldsEncoders
        .slice(!includeName ? 1 : 0)
        .map((it) => {
          return it.encode(it.name.split(`.`)
              .reduce((innerData, key) => {
                return innerData[key];
              }, data));
        });
    const code = fields.join(``);
    return code;
  },
  decode: (code, includeName = true, initialData = {}) => {
    return gameProgressFieldsEncoders
        .slice(!includeName ? 1 : 0)
        .reduce((data, it) => {
          if (!code) {
            return data;
          }
          const {code: tailCode, data: value} = it.decode(code);
          code = tailCode;
          const path = it.name.split(`.`);
          const target = path.length < 2 ? data
            : path.slice(0, -1).reduce((obj, key) => {
              return obj[key] || (obj[key] = {});
            }, data);
          target[path.slice(-1)[0]] = value;
          return data;
        }, initialData);
  }
};
