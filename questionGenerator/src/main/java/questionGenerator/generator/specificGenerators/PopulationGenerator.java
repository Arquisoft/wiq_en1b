package main.java.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import main.java.questionGenerator.generator.AbstractGenerator;
import main.java.questionGenerator.question.QuestionType;

public class PopulationGenerator extends AbstractGenerator {
	
	private final static String PROPERTY = "P1082";
	private final static String MESSAGE = "question.population";

	public PopulationGenerator(){
		super(PROPERTY, QuestionType.POPULATION, MESSAGE);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		List<Statement> statements = claims.get(PROPERTY);
		Value v = statements.get(statements.size()-1).getValue();
		return v.toString();
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		int number = 0;
		// Check if it is a integer
		try {
			number = Integer.parseInt(rightAnswer);
		} catch(NumberFormatException e) {
			//throw exception or maybe return null
		}

		List<String> wrongAnswers = new ArrayList<String>();

		Random rnd = new Random();

		// Gives values depending on parameter with percentage
		// Example: If parameter is 50 value range is number*.5 and number*1.5
		int parameter = 50;
		for(int i = 0; i < 3; i++){
			int wrong = Math.round(number * (100 - parameter + rnd.nextInt(parameter * 2 + 1)) / 100);
			// Checking if it creates the same answer
			if(wrong == number)
				i--;
			else
				wrongAnswers.add(String.valueOf(wrong));
		}
		return wrongAnswers;
	}

}
