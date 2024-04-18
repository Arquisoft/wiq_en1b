package main.java.questionGenerator.generator;

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

import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public abstract class AbstractGenerator implements Generator {
	
	protected static final WikibaseDataFetcher wbdf = WikibaseDataFetcher.getWikidataDataFetcher();
	private String language = "en";

	private Locale localization = Locale.getDefault();
	private ResourceBundle messages;

	private static Map<String, ItemDocumentImpl> alreadyProcessedEntities = new HashMap<>();
	
	private String propertyId = "";
	private QuestionType type;

	private static final String MESSAGES_PATH = "messages";
	
	private String message;
	
	public AbstractGenerator(String propertyId, QuestionType type, String message) {
		this.propertyId = propertyId;
		this.type = type;
		this.message = message;
	}
	
	/**
	 * 
	 * @param id
	 * @return question generated or null if wikidata gives an error
	 * @throws Exception 
	 */
	public Question generate(String id) throws Exception  {
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

		Map<String, MonolingualTextValue> labels = idi.getLabels();
		Map<String, List<Statement>> claims = idi.getJsonClaims();
		
		String name = getName(labels);
		
		//get the question
		String question = getQuestion(name, claims);
		
		//get the right answer
		String rightAnswer = getRightAnswer(claims);
		
		//get the wrong answers
		List<String> answers = getWrongAnswers(rightAnswer);
		
		answers.add(0, rightAnswer);
		
		answers = decorateAnswers(answers);

		//create and return the question
		return new Question(question, answers, language, type);
	}
	
	protected String getName(Map<String, MonolingualTextValue> names) {
		MonolingualTextValue mtv = names.get(language);
		return mtv.getText();
	}
	
	public String getQuestion(String name, Map<String, List<Statement>> claims) {
		String q = getMessages().getString(message);
		return String.format(q, name);
	}

	public String getPropertyId() {
		return propertyId;
	}
	
	public static ItemDocumentImpl getAlreadyProcessedEntity(String id) {
		return alreadyProcessedEntities.get(id);
	}
	
	public static void addProcessedEntity(String entity, ItemDocumentImpl item) {
		alreadyProcessedEntities.put(entity, item);
	}

	public ResourceBundle getMessages() {
		return messages;
	}

	public void setLocalization(String languageCode) {
		if(languageCode==null)
			languageCode = "en";
		else
			languageCode = languageCode.toLowerCase();
		switch (languageCode) {
			case "en":{
				localize(languageCode);
				break;
			}
			case "es":{
				localize(languageCode);
				break;
			}
			default:{
				localize("en");
				break;
			}
		}
	}
	
	private void localize(String languageCode) {
		this.language = languageCode;
		this.localization = new Locale(languageCode);
		this.messages = ResourceBundle.getBundle(MESSAGES_PATH, localization);
	}

	public String getMessage(){
		return message;
	}

}
