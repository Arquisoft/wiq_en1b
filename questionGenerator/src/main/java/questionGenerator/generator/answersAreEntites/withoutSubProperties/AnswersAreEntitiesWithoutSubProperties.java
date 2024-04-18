package main.java.questionGenerator.generator.answersAreEntites.withoutSubProperties;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.generator.answersAreEntites.AbstractAnswersAreEntites;
import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreEntitiesWithoutSubProperties extends AbstractAnswersAreEntites {

	private static final String INSTANCE_OF_PROPERTY = "P31";

	public AnswersAreEntitiesWithoutSubProperties(String propertyId, QuestionType type, String message) {
		super(propertyId, type, message);
	}

	@Override
	public String getRightAnswer(Map<String, List<Statement>> claims) throws Exception {
		if(claims.get(super.getPropertyId())==null) {
			throw new Exception("Claims does not have the property " + super.getPropertyId());
		}
		
		List<Statement> stms = claims.get(getPropertyId());
		Statement stm = stms.get(stms.size()-1);
		return processRightAnswer(stm);
	}

	@Override
	public String getQuestion(String name, Map<String, List<Statement>> claims) {
		String value = processRightAnswer(claims.get(INSTANCE_OF_PROPERTY).get(0));
		String q = getMessages().getString(getMessage());
		return String.format(q, value, name);
	}

}
