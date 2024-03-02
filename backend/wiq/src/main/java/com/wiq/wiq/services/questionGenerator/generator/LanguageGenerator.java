package com.wiq.wiq.services.questionGenerator.generator;

import java.util.List;

public class LanguageGenerator extends RightAnswerIsEntity {
	
	private static final String TEMPLATE = "What's the official language of %s?";
	private final static String PROPERTY = "P37";
	
	public LanguageGenerator() {
		super.setPropertyId(PROPERTY);
		super.setTemplate(TEMPLATE);
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		return null;
	}

}
