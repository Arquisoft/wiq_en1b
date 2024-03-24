package main.java;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class Main {

	private static QuestionType[] types = {QuestionType.POPULATION, QuestionType.CAPITAL, QuestionType.SIZE,
		QuestionType.LANGUAGE};

	public static void main(String[] args) {
		System.out.println("Ahora en Espa�ol");
		QuestionGenerator qg = new QuestionGenerator("es");
		for(QuestionType t : types) {
			run(qg, t);
			System.out.println();
		}
		System.out.println("Now English");
		qg = new QuestionGenerator("en");
		for(QuestionType t : types) {
			run(qg, t);
			System.out.println();
		}
		System.out.println("Now in english but with bad language code");
		qg = new QuestionGenerator("ep");
		for(QuestionType t : types) {
			run(qg, t);
			System.out.println();
		}

	}
	
	private static void run(QuestionGenerator qg, QuestionType type) {
		for(int i=0; i<3; i++) {
			Question question = qg.generateQuestion(type);
			question.setNumber(i);
			QuestionRepository.getInstance().insert(question.getJSON().toString());
			System.out.println(question.getJSON().toString());
		}
	}

}
