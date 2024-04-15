package main.java.questionGenerator.question.answers.formatAnswers;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.answers.AnswerFormater;

public class CapitalLetersFormater implements AnswerFormater {

	@Override
	public List<String> format(List<String> answers) {
		List<String> result = new ArrayList<>();
		for(String s : answers) {
			result.add(toUppercaseFirstCharacter(s));
		}
		return result;
		
	}
	
	private String toUppercaseFirstCharacter(String string) {
		char[] chars = string.toCharArray();
		chars[0] = Character.toUpperCase(chars[0]);
		String result = String.copyValueOf(chars);
		return result;
	}

}