/** @module data/server-data */

/** Тип вопроса на сервере.
 * @enum {string}
 */
const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`,
};

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`,
};

export default {
  QuestionType,
  AnswerType
};
