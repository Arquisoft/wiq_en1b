package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.AnswersAreEntitiesWithoutSubProperties;
import main.java.questionGenerator.question.QuestionType;

public class FilmDirectorGenerator extends AnswersAreEntitiesWithoutSubProperties{

    private final static String PROPERTY = "P57";
	private final static String MESSAGE = "question.director";
	private final static String INSTANCE_OF = "film";

	public FilmDirectorGenerator() {
		super(PROPERTY, QuestionType.DIRECTOR, MESSAGE, INSTANCE_OF);
	}

}
