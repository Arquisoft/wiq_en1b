package main.java.questionGenerator.generator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import main.java.questionGenerator.question.QuestionType;

public abstract class AnswersAreNotEntites extends AbstractGenerator{

    //Open to changes if needed.
    public AnswersAreNotEntites(String propertyId, QuestionType type, String message) {
        super(propertyId, type, message);
    }

    @Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		int inumber = 0;
        float fnumber = 0;
		// Check if it is a float
		try {
			inumber = Integer.parseInt(rightAnswer);
		} catch(NumberFormatException e1) {
			try {
                fnumber = Float.parseFloat(rightAnswer);
            } catch (NumberFormatException e2) {
                //throw some exception or return null.
            }
		}

		List<String> wrongAnswers = new ArrayList<>();
		Random rnd = new Random();

		// Gives values depending on parameter with percentage
		// Example: If parameter is 50 value range is number*.5 and number*1.5
		int parameter = 50;


        if(inumber != 0){
            //for integer values
            for(int i = 0; i < 3; i++){
                long wrong = (inumber * (100 + rnd.nextInt(parameter * 2 + 1) - parameter) / 100);
                // An extra check for the wrong answer to be same sign.
                if((inumber > 0 && wrong < 0) || (inumber < 0 && wrong > 0))
                {
                    i--;
                    continue;
                }
                // Checking if it creates the same answer as any other.
                if(wrong == inumber || wrongAnswers.contains(String.valueOf(wrong)))
                    i--;
                else
                    wrongAnswers.add(String.valueOf(wrong));
            }
        }
        else{
            //for float values
            for(int i = 0; i < 3; i++){
                float wrong = (fnumber * (100 + rnd.nextInt(parameter * 2 + 1) - parameter) / 100);
                // An extra check for the wrong answer to be same sign.
                if((fnumber > 0 && wrong < 0) || (fnumber < 0 && wrong > 0))
                {
                    i--;
                    continue;
                }
                // Checking if it creates the same answer as any other
                if(wrong == fnumber || wrongAnswers.contains(String.valueOf(wrong)))
                    i--;
                else
                    wrongAnswers.add(String.valueOf(wrong));
            }
        }
        return wrongAnswers;
	}
}
