package main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames;

import main.java.questionGenerator.question.QuestionType;

public class VideogameDeveloperGenerator extends AbstractVideogameGenerator {
	
	private static final String PROPERTY = "P404";
	private static final String PROPERTY_TO_CHECK = "P2868";
	private static final String MESSAGE = "question.videogame.developer";
	private static final String REAL_PROPERTY = "P178";

	public VideogameDeveloperGenerator() {
		super(PROPERTY, QuestionType.VIDEOGAME_DEVELOPER, PROPERTY_TO_CHECK, MESSAGE, REAL_PROPERTY);
	}

}
