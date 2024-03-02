package com.wiq.wiq.services.questionGenerator.generator;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

public class CapitalGenerator extends AbstractGenerator {
	
	private final static String TEMPLATE = "What's the capital of %s?";
	private final static String PROPERTY = "P36";

	@Override
	protected String getQuestion(String name) {
		return String.format(TEMPLATE, name);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		List<Statement> a =claims.get(PROPERTY);
		Value v = a.get(0).getValue();
		String ent = getRightAnswerEntity(v.toString());
		String answer = "";
		try {
			answer = getName(((ItemDocumentImpl) wbdf.getEntityDocument(ent)).getLabels());
		} catch (MediaWikiApiErrorException | IOException e) {
			return null;
		}
		return answer;
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

}
