package com.wiq.wiq.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiq.wiq.services.QuestionGeneratorService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestController {

    private QuestionGeneratorService questionGeneratorService;

    public TestController(QuestionGeneratorService questionGeneratorService){
        this.questionGeneratorService = questionGeneratorService;
    }

    @RequestMapping("/question")
    public String requestMethodName() {
        return questionGeneratorService.getQuestions();
    }
    
}
