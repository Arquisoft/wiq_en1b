package main.java;

import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class PersistentMain {
	
	private static long timeSkip = 18000000; //5 hours
//	private static long timeSkip = 43200000; //12 hours
	
	private static QuestionGenerator[] generators = {new QuestionGenerator("en"), new QuestionGenerator("es")};

	public static void main(String[] args) {
		while(true) {
			QuestionRepository.getInstance().removeAll();
			generate();
			try {
				Thread.sleep(timeSkip);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	private static void generate() {
		for(QuestionGenerator qg : generators)
			generateQuestions(qg);
	}
	
	private static void generateQuestions(QuestionGenerator qg) {
		run(qg, QuestionType.CAPITAL, 50);
		run(qg, QuestionType.LANGUAGE, 50);
		run(qg, QuestionType.POPULATION, 50);
		run(qg, QuestionType.SIZE, 50);
		run(qg, QuestionType.HEAD_OF_GOVERMENT, 50);
	}
	
	private static void run(QuestionGenerator qg, QuestionType type, int numberOfQuestions) {
		List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
		for(int i=0; i<questions.size(); i++) {
			Question question = questions.get(i);
			question.setNumber(i);
		}
		QuestionRepository.getInstance().insert(questions.stream().map(q -> q.getJSON().toString()).toList());
	}

}