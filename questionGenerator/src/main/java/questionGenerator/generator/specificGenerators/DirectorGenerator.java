package main.java.questionGenerator.generator.specificGenerators;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.generator.AnswersAreEntities;
import main.java.questionGenerator.question.QuestionType;

public class DirectorGenerator extends AnswersAreEntities{

    private final static String PROPERTY = "P57";
	private final static String MESSAGE = "question.director";

    public DirectorGenerator() {
        super(PROPERTY, QuestionType.DIRECTOR, null, MESSAGE);
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
