package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.AnswersAreEntitiesWithoutSubProperties;
import main.java.questionGenerator.question.QuestionType;

public class DirectorGenerator extends AnswersAreEntitiesWithoutSubProperties{

    private final static String PROPERTY = "P57";
	private final static String MESSAGE = "question.director";

	public DirectorGenerator() {
		super(PROPERTY, QuestionType.DIRECTOR, MESSAGE);
	}

}
