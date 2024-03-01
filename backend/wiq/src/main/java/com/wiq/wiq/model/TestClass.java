package com.wiq.wiq.model;
import org.json.JSONObject;

public class TestClass {
    private String name;
    public TestClass(){
        this.name = createJSON();
    }

    public String getName(){
        return this.name;
    }

    public String createJSON() {
        // Crear el objeto JSON
        JSONObject jsonObject = new JSONObject();

        // Crear el objeto "0"
        JSONObject question0 = new JSONObject();
        question0.put("question", "the actual question");

        // Crear el objeto de respuestas
        JSONObject answers0 = new JSONObject();
        answers0.put("correct", "correct answer");

        // Crear un arreglo de respuestas incorrectas
        String[] wrongAnswers = {"wrong1", "wrong2"};
        answers0.put("wrong", wrongAnswers);

        // Agregar las respuestas al objeto "0"
        question0.put("answers", answers0);

        // Agregar el objeto "0" al objeto JSON principal
        jsonObject.put("0", question0);

        // Retornar el objeto JSON creado
        return jsonObject.toString();
    }
}
