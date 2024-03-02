package com.wiq.wiq.services.questionGenerator;

import java.io.IOException;

import com.wiq.wiq.services.questionGenerator.question.QuestionType;

public class Main {

	public static void main(String[] args) throws IOException {
		QuestionGenerator qg = new QuestionGenerator();
//		String json = "";
////		json = qg.generateQuestion(QuestionType.POPULATION);
//		json = qg.generateQuestion(QuestionType.CAPITAL);
//		System.out.println(json);
		run(qg);

	}
	
	private static void run(QuestionGenerator qg) {
		for(int i=0; i<3; i++) {
			System.out.println(qg.generateQuestion(QuestionType.POPULATION));
		}
		System.out.println();
		for(int i=0; i<3; i++) {
			System.out.println(qg.generateQuestion(QuestionType.CAPITAL));
		}
	}

}
