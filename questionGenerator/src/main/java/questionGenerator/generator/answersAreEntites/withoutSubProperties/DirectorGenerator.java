package main.java.questionGenerator.generator.answersAreEntites.withoutSubProperties;

import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.question.QuestionType;

public class DirectorGenerator extends AnswersAreEntitiesWithoutSubProperties {
	
	private final static String PROPERTY = "P57";
	private final static String MESSAGE = "question.director";
	
	private static Generator generator;
	
	public static Generator getInstance() {
		if(generator==null)
			generator = new DirectorGenerator();
		return generator;
	}

	private DirectorGenerator() {
		super(PROPERTY, QuestionType.DIRECTOR, MESSAGE);
	}

}
