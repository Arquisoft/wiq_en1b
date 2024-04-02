package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.RightAnswerIsEntity;
import main.java.questionGenerator.question.QuestionType;

public class LanguageGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P37";
	private final static String PROPERTY_TO_CHECK = "P518";

	public LanguageGenerator(){
		super(PROPERTY, QuestionType.LANGUAGE, PROPERTY_TO_CHECK);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.language");
		return String.format(q, name);
	}

}
