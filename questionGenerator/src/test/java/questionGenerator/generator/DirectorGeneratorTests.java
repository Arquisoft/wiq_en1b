package test.java.questionGenerator.generator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class DirectorGeneratorTests {
	
	private QuestionGenerator qg = QuestionGenerator.getInstance();
	private List<Question> questions = qg.generateQuestions(QuestionType.DIRECTOR, 3);

	@Test
	@Order(1)
	public void AmountOfQuestions() {
		assertTrue(questions.size()<=3);
	}

	@Test
	@Order(2)
	public void QuestionsAreGeneratedTest() {
		assertNotNull(questions);
		assertNotEquals(List.of(questions), questions);
		for(Question q : questions) {
			assertNotNull(q);
		}
	}
	
	@Test
	@Order(3)
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
	@Order(4)
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
	
	@Test
	@Order(5)
	public void TheQuestionFollowsTheExpectedMessage() {
		for(Question q : questions) {
			assertTrue(q.getQuestion().contains("Who's the director of the "));
			assertTrue(q.getQuestion().endsWith("?"));
		}
	}

}