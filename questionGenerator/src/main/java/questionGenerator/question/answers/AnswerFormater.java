package main.java.questionGenerator.question.answers;

import java.util.List;

public interface AnswerFormater {
	
	List<String> format(List<String> answers);

	List<String> end(List<String> answers);

}
