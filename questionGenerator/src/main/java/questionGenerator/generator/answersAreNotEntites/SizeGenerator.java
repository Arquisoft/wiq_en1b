package main.java.questionGenerator.generator.answersAreNotEntites;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.question.answers.AnswerFormater;
import main.java.questionGenerator.question.answers.formatAnswers.AddUnitsFormater;
import main.java.questionGenerator.question.answers.formatAnswers.EmbellishNumbersFormater;
import main.java.questionGenerator.question.answers.formatAnswers.RemoveEFromNumber;
import main.java.questionGenerator.question.answers.formatAnswers.SetAmountOfDecimals;

public class SizeGenerator extends AnswersAreNotEntites {
	
	private final static String PROPERTY = "P2046";
	private final static String MESSAGE = "question.size";
	
	private static Generator generator;
	
	public static Generator getInstance() {
		if(generator==null)
			generator = new SizeGenerator();
		return generator;
	}

	private SizeGenerator() {
		super(PROPERTY, QuestionType.SIZE, MESSAGE);
	}

	@Override
	public String getRightAnswer(Map<String, List<Statement>> claims, String propertyId) {
		Value v = claims.get(PROPERTY).get(0).getValue();
		return getRightAnswerEntity(v.toString());
	}

	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

	@Override
	public List<String> decorateAnswers(List<String> answers) {
		AnswerFormater formater = new RemoveEFromNumber(new EmbellishNumbersFormater(
				new SetAmountOfDecimals(new AddUnitsFormater(null, "km^2"), 2)));
		return formater.format(answers);
	}

}
