package com.wiq.wiq.services.questionGenerator.generator;

import java.util.List;
import java.util.Map;
import java.util.Math;
import java.util.Random;
import java.util.ArrayList;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

public class PopulationGenerator extends AbstractGenerator {
	
	private final static String TEMPLATE = "What's the population of %s?";
	private final static String PROPERTY = "P1082";
	
	public PopulationGenerator() {
		super.setTemplate(TEMPLATE);
	}

	@Override
	protected String getRightAnswer(Map<String, List<Statement>> claims) {
		Value v = claims.get(PROPERTY).get(0).getValue();
		return v.toString();
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		int number = 0;
		// Check if it is a integer
		if (rightAnswer.matches("\\d+")) {
            // Convert the string to an integer
            number = Integer.parseInt(rightAnswer);
        } else {
            //throw new NotAnInteger();
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
