package com.wiq.wiq.services.questionGenerator;

import com.wiq.wiq.services.questionGenerator.generator.AbstractGenerator;
import com.wiq.wiq.services.questionGenerator.generator.CapitalGenerator;
import com.wiq.wiq.services.questionGenerator.generator.PopulationGenerator;
import com.wiq.wiq.services.questionGenerator.question.QuestionType;



public class QuestionGenerator {
	
	private AbstractGenerator generator;
	private String id;
	
	public String generateQuestion(QuestionType type) {
		generatorFactory(type);
		String answer = generator.generate(id).getJSON().toString();
		return answer;
	}	
	
	private void generatorFactory(QuestionType type) {
		switch (type) {
			case POPULATION: {
				id = "Q14317";
				generator = new PopulationGenerator();
				break;
			}
			case CAPITAL: {
				id = "Q3934";
				generator = new CapitalGenerator();
				break;
				
			}
		}
	}

}
