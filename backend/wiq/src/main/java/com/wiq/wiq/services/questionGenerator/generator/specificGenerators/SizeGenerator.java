package com.wiq.wiq.services.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import com.wiq.wiq.services.questionGenerator.generator.AbstractGenerator;

public class SizeGenerator extends AbstractGenerator {
	
	private static final String TEMPLATE = "What's the size of %s?";
	private final static String PROPERTY = "P2046";
	
	public SizeGenerator() {
		super(PROPERTY, TEMPLATE);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		Value v = claims.get(PROPERTY).get(0).getValue();
		return getRightAnswerEntity(v.toString());
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		return new ArrayList<String>();
	}
	
	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

}
