import { render, screen } from '@testing-library/react';
import RecordList from './RecordList';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
describe('Record List component', () => {
    const record = {
        questions: [
          {
            question: 'What is 2 + 2?',
            answers: ['4', '5', '6'],
            answerGiven: '4',
            correctAnswer: '4'
          },
          {
            question: 'What is the capital of France?',
            answers: ['London', 'Berlin', 'Paris'],
            answerGiven: 'Paris',
            correctAnswer: 'Paris'
          }
        ]
      };
    it('renders the question', () => {
        render(<RecordList record={record} />);
        const question1 = screen.getByText('What is 2 + 2?');
        const question2 = screen.getByText('What is the capital of France?');
        expect(question1).toBeInTheDocument();
        expect(question2).toBeInTheDocument();
    });
    it('renders the answers', () => {
        render(<RecordList record={record} />);
        const answer1 = screen.getByText(/4/);
        const answer2 = screen.getByText(/Paris/);
        expect(answer1).toBeInTheDocument();
        expect(answer2).toBeInTheDocument();
    });
    it('renders the marks for the answers', () => {
        render(<RecordList record={record} />);
        const allElementsWithText = screen.queryAllByText(/.+/);

        // Check if any of these elements contain emojis
        const elementWithGivenEmoji = allElementsWithText.find(element =>
        /👈/.test(element.textContent)
        );
        const elementWithCorrectEmoji = allElementsWithText.find(element =>
        /✅/.test(element.textContent)
        );

        expect(elementWithGivenEmoji).toBeInTheDocument();
        expect(elementWithCorrectEmoji).toBeInTheDocument();
        expect(elementWithGivenEmoji).toHaveTextContent('👈');
        expect(elementWithCorrectEmoji).toHaveTextContent('✅');
    });
    it('renders places correctly the marks for the answers for first question', () => {
        render(<RecordList record={record} />);
        render(<RecordList record={record} />);
        const allElementsWithText = screen.queryAllByText(/.+/);

        // Find the elements containing emojis within the answer lists
        const elementWithGivenEmoji = allElementsWithText.find(element =>
        element.closest('li') && /👈/.test(element.textContent)
        );
        const elementWithCorrectEmoji = allElementsWithText.find(element =>
        element.closest('li') && /✅/.test(element.textContent)
        );

        // Assert that elements with emojis are found within the answer lists
        expect(elementWithGivenEmoji).toBeInTheDocument();
        expect(elementWithCorrectEmoji).toBeInTheDocument();

        // Assert that emojis are associated with the correct answers
        expect(elementWithGivenEmoji).toHaveTextContent('4 👈 ✅');
        expect(elementWithCorrectEmoji).toHaveTextContent('4 👈 ✅');
  });
});