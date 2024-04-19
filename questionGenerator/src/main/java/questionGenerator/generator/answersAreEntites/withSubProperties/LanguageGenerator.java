package main.java.questionGenerator.generator.answersAreEntites.withSubProperties;

import java.util.List;

import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.question.answers.AnswerFormater;
import main.java.questionGenerator.question.answers.formatAnswers.CapitalLetersFormater;

public class LanguageGenerator extends AnswersAreEntitiesWithSubProperties {
	
	private final static String PROPERTY = "P37";
	private final static String PROPERTY_TO_CHECK = "P518";
	private final static String MESSAGE = "question.language";

	public LanguageGenerator(){
		super(PROPERTY, QuestionType.LANGUAGE, PROPERTY_TO_CHECK, MESSAGE);
	}
	
	@Override
	public List<String> decorateAnswers(List<String> answers) {
		AnswerFormater formater = new CapitalLetersFormater(null);
		return formater.format(answers);
	}

}
