package test.java.questionGenerator.generator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class HeadOfStateGeneratorTest {
	
	private QuestionGenerator qg = QuestionGenerator.getInstance();
	private List<Question> questions = qg.generateQuestions(QuestionType.HEAD_OF_GOVERMENT, 3);

	@Test
	public void QuestionsAreGeneratedTest() {
		assertNotNull(questions);
		assertNotEquals(List.of(questions), questions);
		for(Question q : questions) {
			assertNotNull(q);
		}
	}
	
	@Test
	public void AllQuestionsAreDifferentTest() {
		List<String> messages = new ArrayList<String>();
		for(Question q : questions) {
			String question = q.getQuestion();
			assertFalse(messages.contains(question));
			messages.add(question);
		}
		
		assertEquals(questions.size(), messages.size());
	}
	
	@Test
	public void AllAnswersInAQuestionAreDifferent() {
		for(Question q : questions) {
			assertFalse(q.getAnswers().isEmpty());
			List<String> answers = new ArrayList<String>();
			for(String answer : q.getAnswers()) {
				assertFalse(answers.contains(answer));
				answers.add(answer);
			}
			assertEquals(q.getAnswers().size(), answers.size());
		}
	}

}
