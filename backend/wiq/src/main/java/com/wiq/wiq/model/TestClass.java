package com.wiq.wiq.model;

public class TestClass {
    private String name;
    public TestClass(){
        this.name = "{
                        "0": {
                        "question": "the actual question",
                        "answers": {
                        "correct":"correct answer"
                        "wrong":["wrong1","wrong2"]
                                    }
                        }
                    }";
    }

    public String getName(){
        return this.name;
    }
}
