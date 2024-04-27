package tests.java.questionGenerator.question;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import main.java.questionGenerator.question.Question;
import main.java.questionGenerator.question.QuestionType;

public class QuestionTests {

    private Question question;

    @BeforeEach
    void setUp() {
        List<String> answers = Arrays.asList("A", "B", "C");
        question = new Question("What is the capital of France?", answers, "en", QuestionType.CAPITAL);
    }

    @Test
    void testGetQuestion() {
        assertEquals("What is the capital of France?", question.getQuestion());
    }

    @Test
    void testSetQuestion() {
        question.setQuestion("What is the capital of Germany?");
        assertEquals("What is the capital of Germany?", question.getQuestion());
    }

    @Test
    void testGetAnswers() {
        List<String> expectedAnswers = Arrays.asList("A", "B", "C");
        assertEquals(expectedAnswers, question.getAnswers());
    }

    @Test
    void testSetAnswers() {
        List<String> newAnswers = Arrays.asList("X", "Y", "Z");
        question.setAnswers(newAnswers);
        assertEquals(newAnswers, question.getAnswers());
    }

    @Test
    void testAddRightAnswer() {
        question.addRightAnswer("Paris");
        List<String> expectedAnswers = Arrays.asList("Paris", "A", "B", "C");
        assertEquals(expectedAnswers, question.getAnswers());
    }

    @Test
    void testGetJSON() {
        try {
            JSONObject expectedJson = new JSONObject()
                    .put("question", "What is the capital of France?")
                    .put("answers", new JSONArray().put("A").put("B").put("C"))
                    .put("language", "en")
                    .put("type", "CAPITAL");
            assertEquals(expectedJson.toString(), question.getJSON().toString());
        } catch (JSONException e) {
            fail("JSONException occurred: " + e.getMessage());
        }
    }
}
