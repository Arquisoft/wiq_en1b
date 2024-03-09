package com.wiq.wiq.services.questionGenerator.generator;

import java.util.HashMap;

public class FakeResourceBundle {

    private HashMap<String, String> questions = new HashMap<>();

    public FakeResourceBundle(){
        questions.put("question.population", "What's the population of %s?");
        questions.put("question.language", "What's the official language of %s?");
        questions.put("question.capital", "What's the capital of %s?");
        questions.put("question.size", "What's the size of %s?");
    }

    public String getString(String string) {
        return questions.get(string);
    }

}
