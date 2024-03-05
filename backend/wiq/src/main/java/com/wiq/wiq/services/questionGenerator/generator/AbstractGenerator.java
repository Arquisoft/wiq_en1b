package com.wiq.wiq.services.questionGenerator.generator;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.MonolingualTextValue;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.wikibaseapi.WikibaseDataFetcher;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

import com.wiq.wiq.services.questionGenerator.question.Question;

public abstract class AbstractGenerator {
	
	protected static final WikibaseDataFetcher wbdf = WikibaseDataFetcher.getWikidataDataFetcher();
	private String language = "en";

	private Locale localization = Locale.getDefault();
	private ResourceBundle messages;

	private static Map<String, ItemDocumentImpl> alreadyProcessedEntities = new HashMap<>();
	
	private String propertyId = "";

	private static final String MESSAGES_PATH = "com/wiq/wiq/services/questionGenerator/"+
				"generator/rsc/messages";

	public AbstractGenerator(String propertyId) {
		this.propertyId = propertyId;
		// localization = Locale.ENGLISH;
		// this.messages = ResourceBundle.getBundle("com/wiq/wiq/services/questionGenerator/"+
		// "generator/rsc/messages", localization);
	}
	
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
		List<String> answers = getWrongAnswers(rightAnswer);
		
		answers.add(0, rightAnswer);
		//create and return the question
		
		return new Question(question, answers);
	}
	
	protected String getName(Map<String, MonolingualTextValue> names) {
		MonolingualTextValue mtv = names.get(language);
		return mtv.getText();
	}
	
	protected abstract String getQuestion(String name);
	protected abstract String getRightAnswer(Map<String, List<Statement>> claims);
	protected abstract List<String> getWrongAnswers(String rightAnswer);

	public String getPropertyId() {
		return propertyId;
	}

	public static Map<String, ItemDocumentImpl> getAlreadyProcessedEntities() {
		return new HashMap<>(alreadyProcessedEntities);
	}
	
	public static void addItem(String entity, ItemDocumentImpl item) {
		alreadyProcessedEntities.put(entity, item);
	}

	// public String getLanguage() {
	// 	return language;
	// }

	public ResourceBundle getMessages() {
		return messages;
	}

	public void setLocalization(String languageCode) {
		languageCode = languageCode.toLowerCase();
		switch (languageCode) {
			case "en":{
				this.language = "en";
				this.localization = Locale.ENGLISH;
				this.messages = ResourceBundle.getBundle(MESSAGES_PATH, localization);
				break;
			}
			case "es":{
				this.language = "es";
				this.localization = new Locale("es");
				this.messages = ResourceBundle.getBundle(MESSAGES_PATH, localization);
				break;
			}
			default:{
				this.language = "en";
				this.localization = Locale.ENGLISH;
				this.messages = ResourceBundle.getBundle(MESSAGES_PATH, localization);
				break;
			}
		}
	}

}
