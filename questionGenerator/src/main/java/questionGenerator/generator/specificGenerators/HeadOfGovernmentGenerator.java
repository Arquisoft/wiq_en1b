package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.AnswersAreEntities;
import main.java.questionGenerator.question.QuestionType;

public class HeadOfGovernmentGenerator extends AnswersAreEntities {
	
	private final static String PROPERTY = "P6";
	private final static String PROPERTY_TO_CHECK = "P582";
	private final static String MESSAGE = "question.governmentHead";

	public HeadOfGovernmentGenerator() {
		super(PROPERTY, QuestionType.HEAD_OF_GOVERMENT, PROPERTY_TO_CHECK, MESSAGE);
	}

}
