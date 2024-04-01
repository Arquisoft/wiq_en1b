package main.java.questionGenerator.entityGenerator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import main.java.questionGenerator.question.QuestionType;

public class EntityGenerator {

    private static final String PRE_URL = "https://www.wikidata.org/w/api.php?action=query&format=json&"
        + "list=backlinks&formatversion=2&";
	
	private static String property = "";
	private static final String PROPERTY_URL = "bltitle=Property%3A";
	
	private static final String POST_URL = "&blnamespace=0&";
	
	private static final String LIMIT = "bllimit=";
	
	public static List<String> getEntities(QuestionType type, int size) throws IOException{
		propertyFactory(type);
		URL url = new URL(PRE_URL+PROPERTY_URL+property+POST_URL+LIMIT+size);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer content = new StringBuffer();
		while ((inputLine = in.readLine()) != null) {
		    content.append(inputLine);
		}
		in.close();
		
		con.disconnect();
		
		String json = content.toString();
		List<String> result = extractEntities(json);
		
		return result;
	}
	
	private static void propertyFactory(QuestionType type) {
		switch (type) {
		case CAPITAL:
			property = "36";
			break;
		case LANGUAGE:
			property = "37";
			break;
		case POPULATION:
			property = "1082";
			break;
		case SIZE:
			property = "2046";
			break;
		}
	}
	
	private static List<String> extractEntities(String json){
		List<String> result = new ArrayList<>();
		String[] entities = json.split("\"title\":");
		for(int i=1; i<entities.length; i++) {
			String entity = entities[i].split("\"")[1];
			result.add(entity);
		}
		return result;
	}

}
