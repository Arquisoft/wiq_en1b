package com.wiq.wiq.services.questionGenerator.generator;

import java.util.List;

public class CapitalGenerator extends RightAnswerIsEntity {
	
	private final static String TEMPLATE = "What's the capital of %s?";
	private final static String PROPERTY = "P36";
	
	public CapitalGenerator() {
		super.setPropertyId(PROPERTY);
		super.setTemplate(TEMPLATE);
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		return null;
	}

}
