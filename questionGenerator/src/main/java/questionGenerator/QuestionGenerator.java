package main.java.questionGenerator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import main.java.questionGenerator.entityGenerator.EntityGenerator;
import main.java.questionGenerator.generator.AbstractGenerator;
import main.java.questionGenerator.generator.specificGenerators.CapitalGenerator;
import main.java.questionGenerator.generator.specificGenerators.LanguageGenerator;
import main.java.questionGenerator.generator.specificGenerators.PopulationGenerator;
import main.java.questionGenerator.generator.specificGenerators.SizeGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class QuestionGenerator {

    private AbstractGenerator generator;
	private String languageCode;
	
	public QuestionGenerator(String languageCode){
		this.languageCode = languageCode;
	}
	
	public List<Question> generateQuestions(QuestionType type, int amount){
		setGenerator(type);
		generator.setLocalization(languageCode);
		List<Question> questions = new ArrayList<>();
		List<String> entites = new ArrayList<>();
		try {
			entites = EntityGenerator.getEntities(type, 100);
		} catch (IOException e) {
			e.printStackTrace();
		}
		Random rnd = new Random();
		List<String> chosen = new ArrayList<>(); 
		int size = entites.size();
		int number = 0;
		while(number<amount) {
			int index = rnd.nextInt(size);
			String entity = entites.get(index);
			if(!chosen.contains(entity)) {
				chosen.add(entity);
				Question q = generator.generate(entity);
				questions.add(q);
				number++;
			}
		}
		return questions;
	}
	
	private void setGenerator(QuestionType type) {
		switch (type) {
			case POPULATION: {
				generator = new PopulationGenerator();
				break;
			}
			case CAPITAL: {
				generator = new CapitalGenerator();
				break;
				
			}
			case SIZE: {
				generator = new SizeGenerator();
				break;
			}
			case LANGUAGE: {
				generator = new LanguageGenerator();
				break;
			}
		}
	}

}
