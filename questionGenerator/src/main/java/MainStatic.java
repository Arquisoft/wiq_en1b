package main.java;

import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.repository.QuestionRepository;

public class MainStatic {

    public static void main(String[] args) {
		QuestionGenerator qg = QuestionGenerator.getInstance();
		
		run(qg, QuestionType.CAPITAL, 3);
		run(qg, QuestionType.LANGUAGE, 3);
		run(qg, QuestionType.POPULATION, 3);
		run(qg, QuestionType.SIZE, 3);
		run(qg, QuestionType.HEAD_OF_GOVERMENT, 3);
		run(qg, QuestionType.DIRECTOR, 3);
		run(qg, QuestionType.VIDEOGAME_DEVELOPER, 3);
		run(qg, QuestionType.VIDEOGAME_PUBLISHER, 3);
		run(qg, QuestionType.VIDEOGAME_GENRE, 3);
		run(qg, QuestionType.VIDEOGAME_COUNTRY, 3);

	}
	
	private static void run(QuestionGenerator qg, QuestionType type, int numberOfQuestions){
			List<Question> questions = qg.generateQuestions(type, numberOfQuestions);
			QuestionRepository.getInstance().insert(questions.stream().map(q -> q.getJSON().toString()).toList());
	}
}
