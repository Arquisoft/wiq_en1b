package main.java.questionGenerator.generator;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreEntitiesWithoutSubProperties extends AbstractAnswersAreEntites {

	public AnswersAreEntitiesWithoutSubProperties(String propertyId, QuestionType type, String message) {
		super(propertyId, type, message);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) throws Exception {
		if(claims.get(super.getPropertyId())==null) {
			throw new Exception("Claims does not have the property " + super.getPropertyId());
		}
		List<Statement> stms = claims.get(getPropertyId());
		Statement stm = claims.get(getPropertyId()).get(stms.size()-1);
		return processRightAnswer(stm);
	}

}
