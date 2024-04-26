package main.java.questionGenerator.generator.answersAreEntites.withSubProperties.videogames;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.generator.answersAreEntites.withSubProperties.AnswersAreEntitiesWithSubProperties;
import main.java.questionGenerator.question.QuestionType;

public abstract class AbstractVideogameGenerator extends AnswersAreEntitiesWithSubProperties{

    private String realProperty;

    public AbstractVideogameGenerator(String propertyId, QuestionType type, String propertyToCheck, 
    String message, String realProperty) {
        super(propertyId, type, propertyToCheck, message);
        this.realProperty = realProperty;
    }

    @Override
	public String getRightAnswer(Map<String, List<Statement>> claims, String propertyId) throws Exception {
		return super.getRightAnswer(claims, realProperty);
	}

}
