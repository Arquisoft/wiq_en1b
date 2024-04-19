package main.java.questionGenerator.generator.answersAreNotEntites;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.Value;

import main.java.questionGenerator.question.QuestionType;
import main.java.questionGenerator.question.answers.AnswerFormater;
import main.java.questionGenerator.question.answers.formatAnswers.EmbellishNumbersFormater;

public class PopulationGenerator extends AnswersAreNotEntites {
	
	private final static String PROPERTY = "P1082";
	private final static String MESSAGE = "question.population";

	public PopulationGenerator(){
		super(PROPERTY, QuestionType.POPULATION, MESSAGE);
	}

	@Override
	public String getRightAnswer(Map<String, List<Statement>> claims, String propertyId) {
		List<Statement> statements = claims.get(PROPERTY);
		Value v = statements.get(statements.size()-1).getValue();
		return v.toString();
	}

	@Override
	public List<String> decorateAnswers(List<String> answers) {
		AnswerFormater formater = new EmbellishNumbersFormater(null);
		return formater.format(answers);
	}

	@Override
	public List<String> getWrongAnswers(String rightAnswer) {
		List<String> original = super.getWrongAnswers(rightAnswer);
		List<String> result = new ArrayList<>();
		for(String s :  original) {
			result.add(String.valueOf((int) Float.parseFloat(s)));
		}
		return result;
	}
}
