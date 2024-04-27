package main.java.questionGenerator.question;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

public class Question {

	private String question;
    private List<String> answers;
    private String language;
    private QuestionType type;

    public Question(String question, List<String> answers, String language, QuestionType type){
        this.question = question;
        this.answers = new ArrayList<>(answers);
        this.language = language;
        this.type = type;
    }
    
    public Question() {
    	
    }

    public String getQuestion() {
        return question;
    }
    
    public void setQuestion(String question) {
    	this.question = question;
    }

    public List<String> getAnswers() {
        return new ArrayList<>(answers);
    }
    
    public void setAnswers(List<String> answers) {
    	this.answers = new ArrayList<>(answers);
    }
    
    public void addRightAnswer(String answer) {
    	answers.add(0, answer);
    }
	
	public JSONObject getJSON() {
		JSONObject json = new JSONObject();
		json.accumulate("question", question);
		for(String s : answers)
			json.accumulate("answers", s);
        json.accumulate("language", language);
        json.accumulate("type", type);
		return json;
	}

}
