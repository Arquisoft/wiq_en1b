package main.java.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import main.java.questionGenerator.generator.AbstractGenerator;
import main.java.questionGenerator.question.QuestionType;

public class SizeGenerator extends AbstractGenerator {
	
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

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		float number = 0;
		// Check if it is a float
		try {
			number = Float.parseFloat(rightAnswer);
		} catch(NumberFormatException e) {
			//throw exception or maybe return null
		}

		List<String> result = new ArrayList<>();
		Random rnd = new Random();

		// Gives values depending on parameter with percentage
		// Example: If parameter is 50 value range is number*.5 and number*1.5
		int parameter = 50;
		for(int i = 0; i < 3; i++){
			float wrong = (number * (100 - parameter + rnd.nextInt(parameter * 2 + 1)) / 100);
			// Checking if it creates the same answer
			if(wrong == number)
				i--;
			else
				result.add(String.valueOf(wrong));
		}
		return result;
	}
	
	private String getRightAnswerEntity(String url) {
		String[] split1 = url.split(" ");
		String[] split2 = split1[0].split("/");
		return split2[split2.length-1];
	}

}
