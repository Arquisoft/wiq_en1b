package main.java.questionGenerator.question.answers.formatAnswers;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.answers.AbstractFormater;
import main.java.questionGenerator.question.answers.AnswerFormater;

public class AddUnitsFormater extends AbstractFormater {
	
	private String unit;

	public AddUnitsFormater(AnswerFormater formater, String unit) {
		super(formater);
		this.unit = unit;
	}

	@Override
	public List<String> format(List<String> answers) {
		List<String> result = new ArrayList<String>();
		for(String s : answers)
			result.add(s +" " + unit);
		return end(result);
	}

}
