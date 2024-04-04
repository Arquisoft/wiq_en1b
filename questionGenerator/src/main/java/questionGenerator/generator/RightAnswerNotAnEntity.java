package main.java.questionGenerator.generator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import main.java.questionGenerator.question.QuestionType;

public abstract class RightAnswerNotAnEntity extends AbstractGenerator{

    //Open to changes if needed.
    public RightAnswerNotAnEntity(String propertyId, QuestionType type, String message) {
        super(propertyId, type, message);
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

		List<String> wrongAnswers = new ArrayList<>();
		Random rnd = new Random();

		// Gives values depending on parameter with percentage
		// Example: If parameter is 50 value range is number*.5 and number*1.5
		int parameter = 50;
		for(int i = 0; i < 3; i++){
			float wrong = (number * (100 - parameter + rnd.nextInt(parameter * 2 + 1)) / 100);
			// Checking if it creates the same answer as any other
			if(wrong == number || wrongAnswers.contains(String.valueOf(wrong)))
				i--;
			else
				wrongAnswers.add(String.valueOf(wrong));
		}
		return wrongAnswers;
	}
}
