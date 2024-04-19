package main.java.questionGenerator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import main.java.questionGenerator.entityGenerator.EntityGenerator;
import main.java.questionGenerator.generator.Generator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.CapitalGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.HeadOfGovernmentGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.LanguageGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames.VideogameCountryGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames.VideogameDeveloperGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames.VideogameGenreGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames.VideogamePublisherGenerator;
import main.java.questionGenerator.generator.answersAreEntites.withoutSubProperties.DirectorGenerator;
import main.java.questionGenerator.generator.answersAreNotEntites.PopulationGenerator;
import main.java.questionGenerator.generator.answersAreNotEntites.SizeGenerator;
import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class QuestionGenerator {
	
	private Generator generator;
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
			entites = EntityGenerator.getEntities(type, 1000, generator.getPropertyId());
		} catch (IOException e) {
			e.printStackTrace();
		}
		Random rnd = new Random(); 
		int size = entites.size();
		while(questions.size()<amount && size>0) {
			int index = rnd.nextInt(size);
			String entity = entites.get(index);
			entites.remove(index);
			Question q = null;
			try {
				q = generator.generate(entity);
				questions.add(q);
			} catch(RuntimeException e) {
				/*
				 * Sometimes not all the parameters for generating can be passed in the query, so this 
				 * acts as failsave to avoid generating undesired questions, while not overloading the 
				 * screen with error messages if not wanted
				 */
				//System.err.println(e.getMessage());
			} catch (Exception e) {
				//If there's any problem generating the question we jump to the next one
				System.err.println(e.getMessage());
			}
			size = entites.size();
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
			case HEAD_OF_GOVERMENT:{
				generator = new HeadOfGovernmentGenerator();
				break;
			}
			case DIRECTOR: {
				generator = new DirectorGenerator();
				break;
			}
			case VIDEOGAME_DEVELOPER: {
				generator = new VideogameDeveloperGenerator();
				break;
			}
			case VIDEOGAME_PUBLISHER: {
				generator = new VideogamePublisherGenerator();
				break;
			}
			case VIDEOGAME_GENRE: {
				generator = new VideogameGenreGenerator();
				break;
			}
			case VIDEOGAME_COUNTRY:{
				generator = new VideogameCountryGenerator();
				break;
			}
		}
	}

}
