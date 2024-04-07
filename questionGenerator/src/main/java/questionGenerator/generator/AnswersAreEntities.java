package main.java.questionGenerator.generator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.SnakGroup;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

import main.java.questionGenerator.entityGenerator.EntityGenerator;
import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreEntities extends AbstractGenerator {

	private final String PROPERTY_TO_CHECK;
	private final QuestionType type;

	public AnswersAreEntities(String propertyId, QuestionType type, String propertyToCheck, String message) {
		super(propertyId, type, message);
		this.PROPERTY_TO_CHECK = propertyToCheck;
		this.type = type;
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		for(Statement st : claims.get(super.getPropertyId())) {
			boolean valid = true;
			for(SnakGroup sg : st.getQualifiers()) {
				for(Snak s : sg.getSnaks()) {
					String value = getIdFromLink(s.getPropertyId().toString());
					if(value.equals(PROPERTY_TO_CHECK)) {
						valid = false;
						break;
					}
				}
				if(!valid)
					break;
			}
			if(valid) {
				return processRightAnswer(st);
			}
		}
		return null;
	}
	
	protected String processRightAnswer(Statement st) {
		String entity = getIdFromLink(st.getValue().toString());
		String answer = "";
		try {
			ItemDocumentImpl idi = getAlreadyProcessedEntity(entity);
			if(idi==null) {
				idi = (ItemDocumentImpl) wbdf.getEntityDocument(entity);
				answer = getName(idi.getLabels());
				addProcessedEntity(entity, idi);
			}
			else
				answer = getName(idi.getLabels());
		} catch (MediaWikiApiErrorException | IOException e) {
			
		}
		return answer;
	}
	
	protected String getAnswer(String id){
		ItemDocumentImpl idi = getAlreadyProcessedEntity(id);
		
		if(idi==null) {
			try {
				idi = (ItemDocumentImpl) wbdf.getEntityDocument(id);
				addProcessedEntity(id, idi);
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
		return getRightAnswer(idi.getJsonClaims());
	}
	
	protected String getIdFromLink(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}
	
	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		List<String> entites = new ArrayList<>();
		try {
			entites = EntityGenerator.getEntities(type, 100);
		} catch (IOException e) {
			e.printStackTrace();
		}
		Random rnd = new Random();
		List<String> result = new ArrayList<>();
		List<Integer> used = new ArrayList<>();
		for(int i = 0; i < 3; i++){
				int rndnum = rnd.nextInt(entites.size());
				String wrong = getAnswer(entites.get(rndnum));
			if(wrong == null || wrong.equals(rightAnswer) || used.contains(rndnum))
				i--;
			else{
				result.add(wrong);
				used.add(rndnum);
			}
		}
		return result;
	}

}