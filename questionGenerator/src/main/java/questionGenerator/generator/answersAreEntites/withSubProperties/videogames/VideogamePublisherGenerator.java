package main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames;

import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.question.QuestionType;

public class VideogamePublisherGenerator extends AbstractVideogameGenerator {
	
	private static final String PROPERTY = "P404";
	private static final String PROPERTY_TO_CHECK = "P2868";
	private static final String MESSAGE = "question.videogame.publisher";
	private static final String REAL_PROPERTY = "P123";
	
	private static Generator generator;
	
	public static Generator getInstance() {
		if(generator==null)
			generator = new VideogamePublisherGenerator();
		return generator;
	}

	private VideogamePublisherGenerator() {
		super(PROPERTY, QuestionType.VIDEOGAME_PUBLISHER, PROPERTY_TO_CHECK, MESSAGE, REAL_PROPERTY);
	}
}
