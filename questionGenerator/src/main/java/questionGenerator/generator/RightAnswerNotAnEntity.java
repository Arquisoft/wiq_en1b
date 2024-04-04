package main.java.questionGenerator.generator;

import java.util.List;

import main.java.questionGenerator.question.QuestionType;

public abstract class RightAnswerNotAnEntity extends AbstractGenerator{

    //Open to changes if needed.
    public RightAnswerNotAnEntity(String propertyId, QuestionType type, String message) {
        super(propertyId, type, message);
    }

    @Override
    protected List<String> getWrongAnswers(String rightAnswer){
        return null;
    }
}
