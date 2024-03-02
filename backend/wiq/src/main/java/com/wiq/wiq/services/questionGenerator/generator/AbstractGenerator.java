package com.wiq.wiq.services.questionGenerator.generator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.MonolingualTextValue;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.wikibaseapi.WikibaseDataFetcher;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

import com.wiq.wiq.services.questionGenerator.question.Question;

public abstract class AbstractGenerator {
	
	protected static final WikibaseDataFetcher wbdf = WikibaseDataFetcher.getWikidataDataFetcher();
	private static final String LANGUAGE = "en";

	private static Map<String, ItemDocumentImpl> alreadyProcessedEntities = new HashMap<>();
	
	private String propertyId = "";
	private String template = "";
	
	/**
	 * 
	 * @param id
	 * @return question generated or null if wikidata gives an error
	 */
	public Question generate(String id)  {
		//get the wikidata entity using the id
		ItemDocumentImpl idi = alreadyProcessedEntities.get(id);
		
		if(idi==null) {
			try {
				idi = (ItemDocumentImpl) wbdf.getEntityDocument(id);
				alreadyProcessedEntities.put(id, idi);
			} catch (MediaWikiApiErrorException | IOException e) {
				/*
				 * * @throws MediaWikiApiErrorException
				 *             if the API returns an error
				 * @throws IOException
				 * 			   if we encounter network issues or HTTP 500 errors from Wikibase
				 */
				return null;
			}
		}

		
		String name = getName(idi.getLabels());
		
		//get the question
		String question = getQuestion(name);
		
		//get the right answer
		String rightAnswer = getRightAnswer(idi.getJsonClaims());
		
		//get the wrong answers
//		List<String> answers = getWrongAnswers(rightAnswer);
		List<String> answers = new ArrayList<>();
		answers.add("a");
		answers.add("b");
		answers.add("c");
		
		answers.add(0, rightAnswer);
		//create and return the question
		
		return new Question(question, answers);
	}
	
	protected String getName(Map<String, MonolingualTextValue> names) {
		MonolingualTextValue mtv = names.get(LANGUAGE);
		return mtv.getText();
	}
	
	protected String getQuestion(String name) {
		return String.format(template, name);
	}

	protected abstract String getRightAnswer(Map<String, List<Statement>> claims);
	protected abstract List<String> getWrongAnswers(String rightAnswer);

	public String getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

}
