package main.java.questionGenerator;

import main.java.questionGenerator.generator.AbstractGenerator;
import main.java.questionGenerator.generator.specificGenerators.CapitalGenerator;
import main.java.questionGenerator.generator.specificGenerators.LanguageGenerator;
import main.java.questionGenerator.generator.specificGenerators.PopulationGenerator;
import main.java.questionGenerator.generator.specificGenerators.SizeGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;



public class QuestionGenerator {
	
	private AbstractGenerator generator;
	private String id;
	private String languageCode;
	
	private static String[] POP_ENTITIES = {"Q14317", "Q12273", "Q14649"};
	private static String[] CAP_ENTITIES = {"Q3934", "Q29", "Q43"};
	private static String[] SIZE_ENTITIES = {"Q29", "Q12273", "Q3934"};
	private static String[] LANG_ENTITIES = {"Q29", "Q43", "Q3934"};

	public QuestionGenerator(String languageCode){
		this.languageCode = languageCode;
	}
	
	public Question generateQuestion(QuestionType type) {
		generatorFactory(type);
		generator.setLocalization(languageCode);
		return generator.generate(id);
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
