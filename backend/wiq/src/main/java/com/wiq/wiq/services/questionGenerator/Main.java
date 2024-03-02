package com.wiq.wiq.services.questionGenerator;

import com.wiq.wiq.services.questionGenerator.question.QuestionType;

public class Main {

	private static QuestionType[] types = {QuestionType.POPULATION, QuestionType.CAPITAL, QuestionType.SIZE,
		QuestionType.LANGUAGE};

	public static void main(String[] args) {
		QuestionGenerator qg = new QuestionGenerator();
//		String json = "";
////		json = qg.generateQuestion(QuestionType.POPULATION);
//		json = qg.generateQuestion(QuestionType.CAPITAL);
//		System.out.println(json);
//		run(qg);
		
//		System.out.println(qg.generateQuestion(QuestionType.LANGUAGE));
		run(qg);

	}
	
	private static void run(QuestionGenerator qg) {
		for(QuestionType t : types) {
			runTypes(qg, t);
			System.out.println();
		}
	}
	
	private static void runTypes(QuestionGenerator qg, QuestionType type) {
		for(int i=0; i<3; i++) {
			System.out.println(qg.generateQuestion(type));
		}
	}

}
