package com.wiq.wiq.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.wiq.wiq.services.questionGenerator.QuestionGenerator;
import com.wiq.wiq.services.questionGenerator.question.QuestionType;

@Service
public class QuestionGeneratorService {

	private QuestionType[] types = {QuestionType.POPULATION, QuestionType.CAPITAL, QuestionType.SIZE,
		QuestionType.LANGUAGE};

	public String getQuestions() {
		QuestionGenerator qg = new QuestionGenerator("en");
		List<String> toRet = new ArrayList<>();
		for(QuestionType t : types) {
			toRet.addAll(run(qg, t));
		}
		return this.listToJSON(toRet);

	}
	
	private List<String> run(QuestionGenerator qg, QuestionType type) {
		List<String> toRet = new ArrayList<>();
		for(int i=0; i<3; i++) {
			toRet.add(qg.generateQuestion(type));
			System.out.println("Generated");
		}
		return toRet;
	}

	/**
	 * Receives a list of Strings in JSON format and creates a JSON with the keys 0-N, N = size of list
	 * @param list
	 * @return String in JSON format
	 */
	private String listToJSON(List<String> list){
		JSONObject json = new JSONObject();
		for(int i = 0; i < list.size(); i++)
			json.accumulate((i + ""), list.get(i));
		return json.toString();
	}

}
