package test.java.questionGenerator;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import main.java.questionGenerator.QuestionGenerator;
import main.java.questionGenerator.question.QuestionType;

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
                question = qgEN.generateQuestion(t).getJSON().toString();
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

                    // Check for unique answers
                    List<String> seenAnswers = new LinkedList<String>();
                    for (int j = 0; j < answersArray.length(); j++) {
                        String answer = answersArray.getString(j);
                        assertFalse(seenAnswers.contains(answer), "Answer: " + answer + " is duplicated");
                        seenAnswers.add(answer);
                    }
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
                question = qgES.generateQuestion(t).getJSON().toString();
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

                    // Check for unique answers
                    List<String> seenAnswers = new LinkedList<String>();
                    for (int j = 0; j < answersArray.length(); j++) {
                        String answer = answersArray.getString(j);
                        assertFalse(seenAnswers.contains(answer), "Answer: " + answer + " is duplicated");
                        seenAnswers.add(answer);
                    }
                } catch (JSONException e) {
                    fail("Exception occurred while parsing JSON: " + e.getMessage());
                }
            }
		}

	}

}
