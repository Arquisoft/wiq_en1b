package main.java.questionGenerator.question.answers.formatAnswers;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.answers.AbstractFormater;
import main.java.questionGenerator.question.answers.AnswerFormater;

public class SetAmountOfDecimals extends AbstractFormater {
	
	private int amount;

	public SetAmountOfDecimals(AnswerFormater formater, int amount) {
		super(formater);
		this.amount = amount;
	}

	@Override
	public List<String> format(List<String> answers) {
		List<String> result = new ArrayList<>();
		for(String answer : answers) {
			String[] splitted = split(answer);
			if(splitted.length==0)
				result.add(answer);
			else {
				String decimalPart = formatDecimalPart(splitted[1]);
				result.add(splitted[0] + '.' + decimalPart);
			}
		}
		return end(result);
	}
	
	private String[] split(String answer) {
		String[] result = {"", ""};
		int position = 0;
		for(char c : answer.toCharArray()) {
			if(c=='.')
				position = 1;
			else
				result[position] += c;
		}
		return result;
	}
	
	private String formatDecimalPart(String decimalPart) {
		if(decimalPart.length()<amount) {
			int diference = amount - decimalPart.length();
			for(int i=0; i<diference; i++) {
				decimalPart += "0";
			}
		}
		else if(decimalPart.length()>amount) {
			char[] aux = decimalPart.toCharArray();
			decimalPart = "";
			for(int i=0; i<amount; i++) {
				decimalPart += aux[i];
			}
		}
		return decimalPart;
	}

}