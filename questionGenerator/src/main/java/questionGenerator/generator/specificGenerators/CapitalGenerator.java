package main.java.questionGenerator.generator.specificGenerators;

import main.java.questionGenerator.generator.RightAnswerIsEntity;

public class CapitalGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P36";

	public CapitalGenerator(){
		super(PROPERTY, QuestionType.CAPITAL);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.capital");
		return String.format(q, name);
	}

}
