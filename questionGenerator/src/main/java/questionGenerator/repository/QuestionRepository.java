package main.java.questionGenerator.repository;

import com.mongodb.client.ClientSession;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertManyOptions;
import com.mongodb.client.result.InsertManyResult;

import java.util.ArrayList;
import java.util.List;

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

    public boolean insert(String questionJSON){
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

    public boolean insert(List<String> questionJSONList){
        try (MongoClient mongoClient = MongoClients.create(dbConnectionString)) {
            MongoDatabase database = mongoClient.getDatabase("questions");

            MongoCollection<Document> collection = database.getCollection("questions");
        
            List<Document> documents = new ArrayList<>();
            for (String questionJSON : questionJSONList) {
                documents.add(Document.parse(questionJSON));
            }
            
            InsertManyResult result = collection.insertMany(documents, new InsertManyOptions().ordered(false)); //unordered write
            // Check if all documents were inserted successfully
            return result.wasAcknowledged() && result.getInsertedIds().size() == documents.size();
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public boolean removeAll() {
    	try (MongoClient mongoClient = MongoClients.create(dbConnectionString)) {
            MongoDatabase database = mongoClient.getDatabase("questions");

            MongoCollection<Document> collection = database.getCollection("questions");
        
            collection.deleteMany(Document.parse("{}"));
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public boolean populate(List<String> questions) {
        System.out.println("Executing populate");
		try (MongoClient mongoClient = MongoClients.create(dbConnectionString)) {

            ClientSession session = mongoClient.startSession();

            try {
                session.startTransaction();

                MongoDatabase database = mongoClient.getDatabase("questions");

                MongoCollection<Document> collection = database.getCollection("questions");

                collection.deleteMany(session, new Document());

                List<Document> documents = new ArrayList<>();
                for (String questionJSON : questions) {
                    documents.add(Document.parse(questionJSON));
                }
                collection.insertMany(documents);

                session.commitTransaction();

                session.close();
                return true;
            } catch (Exception e) {
                // Abort the transaction if an exception occurs
                session.abortTransaction();
                System.out.println(e);
                return false;
            }
			
		} catch (Exception e) {
            System.out.println(e);
            return false;
        }
		
	}
    
}