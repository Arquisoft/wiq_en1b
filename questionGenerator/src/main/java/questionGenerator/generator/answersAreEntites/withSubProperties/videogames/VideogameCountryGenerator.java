package main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames;

import main.java.questionGenerator.question.QuestionType;

public class VideogameCountryGenerator extends AbstractVideogameGenerator {
	
	private static final String PROPERTY = "P404";
	private static final String PROPERTY_TO_CHECK = "P2868";
	private static final String MESSAGE = "question.videogame.country";
	private static final String REAL_PROPERTY = "P495";
	
	public VideogameCountryGenerator() {
		super(PROPERTY, QuestionType.VIDEOGAME_COUNTRY, PROPERTY_TO_CHECK, MESSAGE, REAL_PROPERTY);
	}

}