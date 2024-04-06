export default class QuestionGenerator {
    async generateQuestions() {
      return [
        {
          getQuestion: () => 'Mocked Question 1',
          getAnswers: () => ['Mocked Answer 1', 'Mocked Answer 2','Mocked Answer 3', 'Mocked Answer 4'],
          getCorrectAnswer: () => 'Mocked Answer 1'
        },
        {
            getQuestion: () => 'Mocked Question 2',
            getAnswers: () => ['Mocked Answer 1', 'Mocked Answer 2','Mocked Answer 3', 'Mocked Answer 4'],
            getCorrectAnswer: () => 'Mocked Answer 4'
          },{
            getQuestion: () => 'Mocked Question 3',
            getAnswers: () => ['Mocked Answer 1', 'Mocked Answer 2','Mocked Answer 3', 'Mocked Answer 4'],
            getCorrectAnswer: () => 'Mocked Answer 2'
          }
      ];
    }
  }