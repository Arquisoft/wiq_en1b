package main.java;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class Main {
	
	private static QuestionGenerator qg = QuestionGenerator.getInstance();
	
	 private static final long TIME_SKIP = 18000000; //5 hours
	// private static final long TIME_SKIP = 43200000; //12 hours
	//private static final long TIME_SKIP = 1000; //1 minute
	

	private static String[] languages = {"en", "es", "tr"};

	private static QuestionType[] types = {QuestionType.CAPITAL, QuestionType.LANGUAGE, QuestionType.POPULATION, 
		QuestionType.SIZE, QuestionType.HEAD_OF_GOVERMENT};
		//, QuestionType.VIDEOGAME_DEVELOPER, QuestionType.VIDEOGAME_PUBLISHER, QuestionType.VIDEOGAME_GENRE, QuestionType.VIDEOGAME_COUNTRY};

 	private static final int NUMBER_OF_QUESTIONS = 20;
	//private static final int NUMBER_OF_QUESTIONS = 75;
	//private static final int NUMBER_OF_QUESTIONS = 3;
	//private static final int NUMBER_OF_QUESTIONS = 1;

	public static void main(String[] args) {
		List<String> questions = generate().stream().map(q -> q.getJSON().toString()).toList();
		while(true) {
			QuestionRepository.getInstance().populate(questions);
			questions = generate().stream().map(q -> q.getJSON().toString()).toList();
			try {
				Thread.sleep(TIME_SKIP);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	private static List<Question> generate() {
		List<Question> questions = new ArrayList<Question>();
		for(String lang : languages) {
			qg.setLanguageCode(lang);
			for(QuestionType type: types){
				System.out.println(String.format("Starting Type: %s Language: %s at: %s", type, lang, new Date()));
				questions.addAll(run(qg, type, NUMBER_OF_QUESTIONS));
				System.out.println(String.format("Type: %s Language: %s Finished", type, lang));
			}
				
		}
		return questions;
	}
	
	private static List<Question> run(QuestionGenerator qg, QuestionType type, int numberOfQuestions) {
		List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
		return questions;
	}

}