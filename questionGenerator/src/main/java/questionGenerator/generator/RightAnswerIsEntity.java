package main.java.questionGenerator.generator;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;
import org.wikidata.wdtk.wikibaseapi.apierrors.MediaWikiApiErrorException;

public abstract class RightAnswerIsEntity extends AbstractGenerator {

	public RightAnswerIsEntity(String propertyId) {
		super(propertyId);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		Value v = claims.get(super.getPropertyId()).get(0).getValue();
		String entity = getRightAnswerEntity(v.toString());
		String answer = "";
		try {
			ItemDocumentImpl idi = getAlreadyProcessedEntities().get(entity);
			if(idi==null) {
				idi = (ItemDocumentImpl) wbdf.getEntityDocument(entity);
				answer = getName(idi.getLabels());
				addItem(entity, idi);
			}
			else
				answer = getName(idi.getLabels());
		} catch (MediaWikiApiErrorException | IOException e) {
			return null;
		}
		return answer;
	}
	
	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

}
