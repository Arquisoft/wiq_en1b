package com.wiq.wiq.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiq.wiq.services.TestService;

@RestController
public class TestController {
    private TestService t;

    public TestController(TestService t){
        this.t = t;
    }


    @RequestMapping("/test") //http://localhost:8090/test
    public String getList() {
    return t.getTest().getName();
    }
}
