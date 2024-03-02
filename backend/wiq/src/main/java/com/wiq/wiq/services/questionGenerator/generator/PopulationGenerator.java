package com.wiq.wiq.services.questionGenerator.generator;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

public class PopulationGenerator extends AbstractGenerator {
	
	private final static String TEMPLATE = "What's the population of %s?";
	private final static String PROPERTY = "P1082";

	@Override
	protected String getQuestion(String name) {
		return String.format(TEMPLATE, name);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		Value v = claims.get(PROPERTY).get(0).getValue();
		return v.toString();
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		return null;
	}

}
