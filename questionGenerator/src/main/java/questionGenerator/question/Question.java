package main.java.questionGenerator.question;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

public class Question {

	private String question;
    private List<String> answers;
    private int number = -1;

    public Question(String question, List<String> answers){
        this.question = question;
        this.answers = new ArrayList<>(answers);
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

    public void setNumber(int number){
        this.number = number;
    }
	
	public JSONObject getJSON() {
		JSONObject json = new JSONObject();
		json.accumulate("question", question);
		for(String s : answers)
			json.accumulate("answers", s);
        if(number != -1) json.accumulate("number", number); //Para que los tests pasen
		return json;
	}

}
