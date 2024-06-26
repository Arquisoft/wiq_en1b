package main.java.questionGenerator.generator;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.Statement;

import main.java.questionGenerator.question.Question;

public interface Generator {

    Question generate(String id) throws Exception;
	
	String getQuestion(String name, Map<String, List<Statement>> claims);
	
	String getRightAnswer(Map<String, List<Statement>> claims, String propertyId) throws Exception;
	
	List<String> getWrongAnswers(String rightAnswer) throws Exception;
	
	List<String> decorateAnswers(List<String> answers);
 
	String getPropertyId();
	
	void setLocalization(String languageCode);

	void setSampleSize(long sampleSize);

	long getSampleSize();

}
