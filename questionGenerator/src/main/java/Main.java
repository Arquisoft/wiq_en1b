package main.java;

import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class Main {

    public static void main(String[] args) {
		QuestionGenerator qgEn = new QuestionGenerator("en");
		
		run(qgEn, QuestionType.CAPITAL, 3);
		System.out.println();
		
		run(qgEn, QuestionType.LANGUAGE, 3);
		System.out.println();
		
		run(qgEn, QuestionType.POPULATION, 3);
		System.out.println();
		
		run(qg, QuestionType.SIZE, 3);
		System.out.println();

		run(qg, QuestionType.HEAD_OF_GOVERMENT, 3);
	}
	
	private static void run(QuestionGenerator qg, QuestionType type, int numberOfQuestions){
			List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
			QuestionRepository.getInstance().insert(questions.stream().map(q -> q.getJSON().toString()).toList());
	}
}
