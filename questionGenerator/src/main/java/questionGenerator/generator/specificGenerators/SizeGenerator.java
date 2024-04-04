package main.java.questionGenerator.generator.specificGenerators;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import main.java.questionGenerator.generator.AnswersAreNotEntites;
import main.java.questionGenerator.question.QuestionType;

public class SizeGenerator extends AnswersAreNotEntites {
	
	private final static String PROPERTY = "P2046";
	private final static String MESSAGE = "question.size";

	public SizeGenerator() {
		super(PROPERTY, QuestionType.SIZE, MESSAGE);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		Value v = claims.get(PROPERTY).get(0).getValue();
		return getRightAnswerEntity(v.toString());
	}

	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

}
