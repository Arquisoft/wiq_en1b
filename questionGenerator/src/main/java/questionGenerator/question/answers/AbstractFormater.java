package main.java.questionGenerator.question.answers;

import java.util.List;

public abstract class AbstractFormater implements AnswerFormater{

    private AnswerFormater formater;

    public AbstractFormater(AnswerFormater formater){
        this.formater = formater;
    }

    public List<String> end(List<String> answers){
        if(formater!=null)
            return formater.format(answers);
        return answers;
    }

}
