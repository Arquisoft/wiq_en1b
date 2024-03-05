package com.wiq.wiq.services.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;

import com.wiq.wiq.services.questionGenerator.generator.RightAnswerIsEntity;

public class CapitalGenerator extends RightAnswerIsEntity {
	
	// private final static String TEMPLATE = "What's the capital of %s?";
	private final static String PROPERTY = "P36";
	
	private static CapitalGenerator capitalGenerator = null;
	
	public static CapitalGenerator getInstance() {
		if(capitalGenerator == null)
			capitalGenerator = new CapitalGenerator();
		return capitalGenerator;
	}
	
	private CapitalGenerator() {
		super(PROPERTY);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.capital");
		return String.format(q, name);
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		List<String> result = new ArrayList<>();
		result.add("a");
		result.add("b");
		result.add("c");
		return result;
	}

}
