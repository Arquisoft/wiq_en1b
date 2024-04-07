package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.AnswersAreEntities;
import main.java.questionGenerator.question.QuestionType;

public class CapitalGenerator extends AnswersAreEntities {
	
	private final static String PROPERTY = "P36";
	private final static String PROPERTY_TO_CHECK = "P582";
	private final static String MESSAGE = "question.capital";

	public CapitalGenerator(){
		super(PROPERTY, QuestionType.CAPITAL, PROPERTY_TO_CHECK, MESSAGE);
	}

}
