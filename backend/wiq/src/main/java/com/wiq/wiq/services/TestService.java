package com.wiq.wiq.services;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.wiq.wiq.model.TestClass;

@Service
public class TestService {
    private TestClass test;

    @PostConstruct
    public void init(){
        test = new TestClass();
    }

    public TestClass getTest(){
        return this.test;
    }
}
