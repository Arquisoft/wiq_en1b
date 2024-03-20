package main.java.questionGenerator.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class QuestionRepository {

    private static QuestionRepository questionRepository;

    private String dbConnectionString;

    private QuestionRepository(){
        this.dbConnectionString = System.getenv("MONGODB_URI_QUESTIONS") != null ? System.getenv("MONGODB_URI_QUESTIONS") : "mongodb://localhost:27017/questions";
    }

    public static QuestionRepository getInstance(){
        if(questionRepository == null)
            questionRepository = new QuestionRepository();
        return questionRepository;
    }

    public boolean insertOne(String questionJSON){
        try (MongoClient mongoClient = MongoClients.create(dbConnectionString)) {
            MongoDatabase database = mongoClient.getDatabase("questions");

            MongoCollection<Document> collection = database.getCollection("questions");
        
            collection.insertOne(Document.parse(questionJSON));
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
    
}