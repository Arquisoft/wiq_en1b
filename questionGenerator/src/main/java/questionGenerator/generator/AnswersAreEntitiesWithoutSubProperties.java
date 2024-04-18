package main.java.questionGenerator.generator;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreEntitiesWithoutSubProperties extends AbstractAnswersAreEntites {

	private static final String INSTANCE_OF_PROPERTY = "P31";
	private String instanceOf;

	public AnswersAreEntitiesWithoutSubProperties(String propertyId, QuestionType type, String message, 
			String instanceOfPropertyValue) {
		super(propertyId, type, message);
		this.instanceOf = instanceOfPropertyValue;
	}

	@Override
	public String getRightAnswer(Map<String, List<Statement>> claims) throws Exception {
		if(claims.get(super.getPropertyId())==null) {
			throw new Exception("Claims does not have the property " + super.getPropertyId());
		}

		String value = processRightAnswer(claims.get(INSTANCE_OF_PROPERTY).get(0));
		if(!value.equals(instanceOf)) {
			throw new RuntimeException("The entity is not a " + instanceOf);
		}
		
		List<Statement> stms = claims.get(getPropertyId());
		Statement stm = stms.get(stms.size()-1);
		return processRightAnswer(stm);
	}

}
