package main.java.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.generator.RightAnswerIsEntity;

public class LanguageGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P37";

	public LanguageGenerator(){
		super(PROPERTY);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.language");
		return String.format(q, name);
	}

	@Override
	protected List<String> getWrongAnswers(String rightAnswer) {
		// TODO Auto-generated method stub
		List<String> result = new ArrayList<>();
		result.add("a");
		result.add("b");
		result.add("c");
		return result;
	}

}
