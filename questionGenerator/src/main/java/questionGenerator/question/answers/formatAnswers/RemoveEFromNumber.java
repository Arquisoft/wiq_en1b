package main.java.questionGenerator.question.answers.formatAnswers;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.answers.AnswerFormater;

public class RemoveEFromNumber implements AnswerFormater {
	
	private AnswerFormater formater;
	
	public RemoveEFromNumber(AnswerFormater formater) {
		this.formater = formater;
	}

	@Override
	public List<String> format(List<String> answers) {
		List<String> result = new ArrayList<>();
		for(String s : answers) {
			result.add(removeE(s));
		}
		return formater.format(result);
	}
	
	private String removeE(String answer) {
		String[] number = answer.split("E");
		if(number.length==1)
			return answer;
		String value = removeDecimalPoint(number[0]);
		for(int i=value.length(); i<Integer.valueOf(number[1]); i++)
			value+="0";
		return value;
	}
	
	private String removeDecimalPoint(String str) {
    	char[] chars = str.toCharArray();
    	String result = "";
    	for(char c : chars) {
    		if(c != '.')
    			result+=c;
    	}
    	return result;
    }

}