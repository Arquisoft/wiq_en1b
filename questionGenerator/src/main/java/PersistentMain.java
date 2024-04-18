package main.java;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class PersistentMain {
	
	private static long timeSkip = 18000000; //5 hours
//	private static long timeSkip = 43200000; //12 hours
//	private static long timeSkip = 1000; //1 minute
	
	private static QuestionGenerator[] generators = {new QuestionGenerator("en"), new QuestionGenerator("es")};

	public static void main(String[] args) {
		while(true) {
			List<Question> questions = generate();
			QuestionRepository.getInstance().populate(questions);
			try {
				Thread.sleep(timeSkip);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	private static List<Question> generate() {
		List<Question> questions = new ArrayList<Question>();
		for(QuestionGenerator qg : generators)
			questions.addAll(generateQuestions(qg));
		return questions;
	}
	
	private static List<Question> generateQuestions(QuestionGenerator qg) {
		List<Question> questions = new ArrayList<>();
		questions.addAll(run(qg, QuestionType.CAPITAL, 50));
		questions.addAll(run(qg, QuestionType.LANGUAGE, 50));
		questions.addAll(run(qg, QuestionType.POPULATION, 50));
		questions.addAll(run(qg, QuestionType.SIZE, 50));
		questions.addAll(run(qg, QuestionType.HEAD_OF_GOVERMENT, 50));
		questions.addAll(run(qg, QuestionType.DIRECTOR, 50));
		return questions;
	}
	
	private static List<Question> run(QuestionGenerator qg, QuestionType type, int numberOfQuestions) {
		List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
		for(int i=0; i<questions.size(); i++) {
			Question question = questions.get(i);
			question.setNumber(i);
		}
		return questions;
	}

}