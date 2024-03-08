package com.wiq.wiq.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.wiq.wiq.services.questionGenerator.QuestionGenerator;
import com.wiq.wiq.services.questionGenerator.question.QuestionType;

import static org.junit.jupiter.api.Assertions.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class QuestionGeneratorTests {

    private QuestionGenerator qgEN;
    private QuestionGenerator qgES;

    private static QuestionType[] types = {QuestionType.POPULATION, QuestionType.CAPITAL, QuestionType.SIZE, QuestionType.LANGUAGE};

    @BeforeEach
    void setUp(){
        qgEN = new QuestionGenerator("en");
        qgES = new QuestionGenerator("es");
    }

    @Test
	void testGenerateQuestionsEnglish() {

        String question;

        for(QuestionType t : types) {
			for(int i=0; i<3; i++) {
                question = qgEN.generateQuestion(t);
                JSONObject json = null;

                //Check correct format
                try {
                    json = new JSONObject(question);
                } catch (JSONException e) {
                    fail("Not a JSON");
                }

                assertNotNull(json, "JSONObject was not initialized");

                //Check for expected fields
                try {
                    // Test question
                    assertTrue(json.has("question"));


                    // Test answers
                    assertTrue(json.has("answers"));

                    // Retrieve the "answers" field and check if it's an array
                    Object answersField = json.get("answers");
                    assertTrue(answersField instanceof JSONArray, "The 'answers' field is not an array");

                    // Convert the field to a JSONArray
                    JSONArray answersArray = (JSONArray) answersField;

                    // Check if the array has size 4
                    assertEquals(4, answersArray.length(), "There aren't 4 answers");
                } catch (JSONException e) {
                    fail("Exception occurred while parsing JSON: " + e.getMessage());
                }
            }
		}

	}

    @Test
	void testGenerateQuestionsSpanish() {

        String question;

        for(QuestionType t : types) {
			for(int i=0; i<3; i++) {
                question = qgES.generateQuestion(t);
                JSONObject json = null;

                //Check correct format
                try {
                    json = new JSONObject(question);
                } catch (JSONException e) {
                    fail("Not a JSON");
                }

                assertNotNull(json, "JSONObject was not initialized");

                //Check for expected fields
                try {
                    // Test question
                    assertTrue(json.has("question"));


                    // Test answers
                    assertTrue(json.has("answers"));

                    // Retrieve the "answers" field and check if it's an array
                    Object answersField = json.get("answers");
                    assertTrue(answersField instanceof JSONArray, "The 'answers' field is not an array");

                    // Convert the field to a JSONArray
                    JSONArray answersArray = (JSONArray) answersField;

                    // Check if the array has size 4
                    assertEquals(4, answersArray.length(), "There aren't 4 answers");
                } catch (JSONException e) {
                    fail("Exception occurred while parsing JSON: " + e.getMessage());
                }
            }
		}

	}

}
