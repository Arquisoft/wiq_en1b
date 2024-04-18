package main.java.questionGenerator.generator.answersAreEntites.withSubProperties;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.SnakGroup;
import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.generator.answersAreEntites.AbstractAnswersAreEntites;
import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreEntitiesWithSubProperties extends AbstractAnswersAreEntites {
	
	private final String PROPERTY_TO_CHECK;

	public AnswersAreEntitiesWithSubProperties(String propertyId, QuestionType type, String propertyToCheck, String message) {
		super(propertyId, type, message);
		this.PROPERTY_TO_CHECK = propertyToCheck;
	}

	@Override
	public String getRightAnswer(Map<String, List<Statement>> claims, String propertyId) throws Exception {
		if(claims.get(propertyId)==null) {
			throw new Exception("Claims does not have the property " + propertyId);
		}
		
		for(Statement st : claims.get(propertyId)) {
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

}
