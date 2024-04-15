package main.java.questionGenerator.question.answers.formatAnswers;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.answers.AnswerFormater;

public class EmbellishNumbersFormater implements AnswerFormater {

	@Override
	public List<String> format(List<String> answers) {
		List<String> result = new ArrayList<>();
    	for(String s : answers) {
    		result.add(decorateAnswer(s));
    	}
    	return result;
	}
    
	private String decorateAnswer(String answer) {
    	char[] chars = answer.toCharArray();
    	chars = invert(chars);
    	Character splitter = ',';
    	int splitPoint = getSplitPoint(chars);
    	String result = "";
    	int j=0;
    	for(int i=0; i<chars.length; i++) {
    		result += chars[i];
    		if(i>splitPoint) {
    			j++;
    			if(j%3==0 && i<chars.length-1)
    				result += splitter;
    		}
    	}
    	chars = invert(result.toCharArray());
    	result = String.valueOf(chars);
    	return result;
    }
    
    private int getSplitPoint(char[] answer) {
    	for(int i=0; i<answer.length; i++) {
    		if(answer[i] == '.')
    			return i;
    	}
    	return -1;
    }

    private char[] invert(char[] chars) {
    	char[] result = new char[chars.length];
    	int j=0;
    	for(int i=chars.length-1; i>=0; i--) {
    		result[j++] = chars[i];
    	}
    	return result;
    }

}