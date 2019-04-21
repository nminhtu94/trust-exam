class QuestionObject {
  constructor(desc, choices, answer) {
    this._desc = desc;
    this._choices = choices;
    this._answer = answer;
  }

  static fromJSON(dict) {
    return new QuestionObject(
      dict['question'],
      dict['choices'],
      dict['answer']
    );
  }

  get desc() {
    return this._desc;
  }

  get choices() {
    return this._choices;
  }

  get answer() {
    return this._answer;
  }
};

export default QuestionObject;