package main.java;

import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class Main {

    public static void main(String[] args) {
		QuestionGenerator qg = new QuestionGenerator("en");
		
		run(qg, QuestionType.CAPITAL, 3);
		System.out.println();
		
		run(qg, QuestionType.LANGUAGE, 3);
		System.out.println();
		
		run(qg, QuestionType.POPULATION, 3);
		System.out.println();
		
		run(qg, QuestionType.SIZE, 3);
		System.out.println();

		run(qg, QuestionType.HEAD_OF_GOVERMENT, 3);
	}
	
	private static void run(QuestionGenerator qg, QuestionType type, int numberOfQuestions){
			List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
			for(int i=0; i<questions.size(); i++) {
				Question question = questions.get(i);
				question.setNumber(i);
				System.out.println(question.getJSON().toString());
			}
			QuestionRepository.getInstance().insert(questions.stream().map(q -> q.getJSON().toString()).toList());
	}
}
