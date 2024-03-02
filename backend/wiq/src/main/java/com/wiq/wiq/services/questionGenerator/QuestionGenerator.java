package com.wiq.wiq.services.questionGenerator;

import com.wiq.wiq.services.questionGenerator.generator.AbstractGenerator;
import com.wiq.wiq.services.questionGenerator.generator.CapitalGenerator;
import com.wiq.wiq.services.questionGenerator.generator.LanguageGenerator;
import com.wiq.wiq.services.questionGenerator.generator.PopulationGenerator;
import com.wiq.wiq.services.questionGenerator.generator.SizeGenerator;
import com.wiq.wiq.services.questionGenerator.question.QuestionType;



public class QuestionGenerator {
	
	private AbstractGenerator generator;
	private String id;
	
	private static String[] POP_ENTITIES = {"Q14317", "Q12273", "Q14649"};
	private static String[] CAP_ENTITIES = {"Q3934", "Q29", "Q43"};
	private static String[] SIZE_ENTITIES = {"Q29", "Q12273", "Q3934"};
	private static String[] LANG_ENTITIES = {"Q29", "Q43", "Q3934"};
	
	public String generateQuestion(QuestionType type) {
		generatorFactory(type);
		String answer = generator.generate(id).getJSON().toString();
		return answer;
	}	
	
	private void generatorFactory(QuestionType type) {
		switch (type) {
			case POPULATION: {
				id = POP_ENTITIES[0];
				generator = new PopulationGenerator();
				moveUp(POP_ENTITIES);
				POP_ENTITIES[POP_ENTITIES.length-1] = id;
				break;
			}
			case CAPITAL: {
				id = CAP_ENTITIES[0];
				generator = new CapitalGenerator();
				moveUp(CAP_ENTITIES);
				CAP_ENTITIES[CAP_ENTITIES.length-1] = id;
				break;
				
			}
			case SIZE: {
				id = SIZE_ENTITIES[0];
				generator = new SizeGenerator();
				moveUp(SIZE_ENTITIES);
				SIZE_ENTITIES[SIZE_ENTITIES.length-1] = id;
				break;
			}
			case LANGUAGE: {
				id = LANG_ENTITIES[0];
				generator = new LanguageGenerator();
				moveUp(LANG_ENTITIES);
				LANG_ENTITIES[LANG_ENTITIES.length-1] = id;
				break;
			}
		}
	}
	
	private void moveUp(String[] list) {
		for(int i=0; i<list.length-1; i++) {
			list[i] = list[i+1];
		}
	}

}
