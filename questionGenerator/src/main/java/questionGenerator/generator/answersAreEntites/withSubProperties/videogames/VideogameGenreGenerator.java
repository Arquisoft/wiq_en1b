package main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames;

import java.util.List;

import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.question.answers.AnswerFormater;
import main.java.questionGenerator.question.answers.formatAnswers.CapitalLetersFormater;;

public class VideogameGenreGenerator extends AbstractVideogameGenerator {
	
	private static final String PROPERTY = "P404";
	private static final String PROPERTY_TO_CHECK = "P2868";
	private static final String MESSAGE = "question.videogame.genre";
	private static final String REAL_PROPERTY = "P136";
	
	private static Generator generator;
	
	public static Generator getInstance() {
		if(generator==null)
			generator = new VideogameGenreGenerator();
		return generator;
	}

	private VideogameGenreGenerator() {
		super(PROPERTY, QuestionType.VIDEOGAME_DEVELOPER, PROPERTY_TO_CHECK, MESSAGE, REAL_PROPERTY);
	}
	
	@Override
	public List<String> decorateAnswers(List<String> answers) {
		AnswerFormater formater = new CapitalLetersFormater(null);
		return formater.format(answers);
	}
}
