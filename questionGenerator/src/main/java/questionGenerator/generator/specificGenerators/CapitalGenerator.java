package main.java.questionGenerator.generator.specificGenerators;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.SnakGroup;
import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.generator.RightAnswerIsEntity;
import main.java.questionGenerator.question.QuestionType;

public class CapitalGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P36";

	public CapitalGenerator(){
		super(PROPERTY, QuestionType.CAPITAL);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.capital");
		return String.format(q, name);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		for(Statement st : claims.get(super.getPropertyId())) {
			boolean valid = true;
			for(SnakGroup sg : st.getQualifiers()) {
				for(Snak s : sg.getSnaks()) {
					String value = getRightAnswerEntity(s.getPropertyId().toString());
					if(value.equals("P582")) {
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
