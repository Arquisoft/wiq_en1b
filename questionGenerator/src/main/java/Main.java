package main.java;

import java.util.List;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class Main {

    public static void main(String[] args) {
		QuestionGenerator qg = new QuestionGenerator("en");
		List<Question> qs = qg.generateQuestions(QuestionType.CAPITAL, 3);
		for(Question q : qs) {
			System.out.println(q.getJSON().toString());
		}
		System.out.println();
		
		qs = qg.generateQuestions(QuestionType.LANGUAGE, 3);
		for(Question q : qs) {
			System.out.println(q.getJSON().toString());
		}
		System.out.println();
		
		qs = qg.generateQuestions(QuestionType.POPULATION, 3);
		for(Question q : qs) {
			System.out.println(q.getJSON().toString());
		}
		System.out.println();
		
		qs = qg.generateQuestions(QuestionType.SIZE, 3);
		for(Question q : qs) {
			System.out.println(q.getJSON().toString());
		}
	}

}
