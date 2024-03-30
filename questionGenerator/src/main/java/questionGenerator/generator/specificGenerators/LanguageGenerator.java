package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.RightAnswerIsEntity;

public class LanguageGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P37";

	public LanguageGenerator(){
		super(PROPERTY);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.language");
		return String.format(q, name);
	}

}
