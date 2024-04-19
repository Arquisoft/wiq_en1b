package main.java.questionGenerator.generator.answersAreEntites.withSubProperties;

import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.question.QuestionType;

public class HeadOfGovernmentGenerator extends AnswersAreEntitiesWithSubProperties {
	
	private final static String PROPERTY = "P6";
	private final static String PROPERTY_TO_CHECK = "P582";
	private final static String MESSAGE = "question.governmentHead";
	
	private static Generator generator;
	
	public static Generator getInstance() {
		if(generator==null)
			generator = new HeadOfGovernmentGenerator();
		return generator;
	}

	private HeadOfGovernmentGenerator() {
		super(PROPERTY, QuestionType.HEAD_OF_GOVERMENT, PROPERTY_TO_CHECK, MESSAGE);
	}

}
