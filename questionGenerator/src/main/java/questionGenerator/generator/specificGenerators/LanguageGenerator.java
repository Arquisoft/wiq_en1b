package main.java.questionGenerator.generator.specificGenerators;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import main.java.questionGenerator.generator.RightAnswerIsEntity;

public class LanguageGenerator extends RightAnswerIsEntity {
	
	private final static String PROPERTY = "P37";

	public LanguageGenerator(){
		super(PROPERTY);
	}

	@Override
	protected String getQuestion(String name) {
		String q = getMessages().getString("question.language");
		return String.format(q, name);
	}

	// @Override
	// protected List<String> getWrongAnswers(String rightAnswer) {
	// 	Random rnd = new Random();
	// 	String[] entities = {"Q142", "Q183", "Q16", "Q142", "Q30", "Q408", "Q668", "Q17", "Q38", "Q159",
	// 	 "Q79", "Q155", "Q884", "Q414", "Q41", "Q258", "Q96", "Q843", "Q148", "Q20"};
	// 	List<String> result = new ArrayList<>();
	// 	List<Integer> used = new ArrayList<>();
	// 	for(int i = 0; i < 3; i++){
	// 			int rndnum = rnd.nextInt(entities.length);
	// 			String wrong = getAnswer(entities[rndnum]);
	// 		if(wrong.equals(rightAnswer) || used.contains(rndnum))
	// 			i--;
	// 		else{
	// 			result.add(wrong);
	// 			used.add(rndnum);
	// 		}
	// 	}
	// 	return result;
	// }

}
