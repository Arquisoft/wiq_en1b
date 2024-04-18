package main.java.questionGenerator.generator.answersAreEntites;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

import main.java.questionGenerator.entityGenerator.EntityGenerator;
import main.java.questionGenerator.generator.AbstractGenerator;
import main.java.questionGenerator.question.QuestionType;


public abstract class AbstractAnswersAreEntites extends AbstractGenerator{

    private QuestionType type;

    public AbstractAnswersAreEntites(String propertyId, QuestionType type, String message) {
        super(propertyId, type, message);
        this.type = type;
    }

    private String getAnswer(String id) throws Exception{
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

	@Override
	public List<String> getWrongAnswers(String rightAnswer) throws Exception {
		List<String> entites = new ArrayList<>();
		try {
			entites = EntityGenerator.getEntities(type, 1000, getPropertyId());
		} catch (IOException e) {
			e.printStackTrace();
		}
		Random rnd = new Random();
		List<String> result = new ArrayList<>();
		for(int i = 0; i < 3; i++){
				int rndnum = rnd.nextInt(entites.size());
				String wrong = getAnswer(entites.get(rndnum));
			if(wrong == null || wrong.equals(rightAnswer) || result.contains(wrong))
				i--;
			else{
				result.add(wrong);
			}
		}
		return result;
	}
	
	/**
	 * Since most of the implementations do not require to decorate the answer, this general one 
	 * simply returns the value passed to it as a parameter
	 */
	@Override
	public List<String> decorateAnswers(List<String> answers) {
		return answers;
	}
	
	protected String getIdFromLink(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
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

}
