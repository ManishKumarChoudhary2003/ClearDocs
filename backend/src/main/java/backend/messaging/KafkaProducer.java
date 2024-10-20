package backend.messaging;


import backend.entity.PlatformUser;
import backend.utils.KafkaConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void producerForRegistration(PlatformUser platformUser){
        try {
            String userJson = objectMapper.writeValueAsString(platformUser);
            kafkaTemplate.send(KafkaConstants.REGISTRATION_TOPIC, userJson);
            System.out.println("Sent user registration data to Kafka topic: " + platformUser.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void producerForStudentRegistration(String email, String enrollmentNumber) {
        try {
            Map<String, String> studentData = new HashMap<>();
            studentData.put("email", email);
            studentData.put("enrollmentNumber", enrollmentNumber);

            String studentJson = objectMapper.writeValueAsString(studentData);
            kafkaTemplate.send(KafkaConstants.STUDENT_REGISTRATION, studentJson);
            System.out.println("Sent student registration data to Kafka topic: " + email);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void producerForStudentUpdation(String email) {
        try {
            kafkaTemplate.send(KafkaConstants.STUDENT_UPDATION, email);
            System.out.println("Sent student updation data to Kafka topic: " + email);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void producerForStudentDeletion(String email) {
        try {
            kafkaTemplate.send(KafkaConstants.STUDENT_DELETION, email);
            System.out.println("Sent student deletion data to Kafka topic: " + email);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void producerForDocumentUpload(String email, String documentType) {
        try {
            Map<String, String> docs = new HashMap<>();
            docs.put("email", email);
            docs.put("documentType", documentType);

            String docJson = objectMapper.writeValueAsString(docs);
            kafkaTemplate.send(KafkaConstants.STUDENT_DOCUMENT_UPLOAD, docJson);
            System.out.println("Sent document upload data to Kafka topic: " + email);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void producerForDocumentDeletion(String email, String documentType) {
        try {
            Map<String, String> docs = new HashMap<>();
            docs.put("email", email);
            docs.put("documentType", documentType);

            String docJson = objectMapper.writeValueAsString(docs);
            kafkaTemplate.send(KafkaConstants.STUDENT_DOCUMENT_DELETE, docJson);
            System.out.println("Sent document delete data to Kafka topic: " + email);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void producerForDocumentVerification(String email, String originalFilename) {
        try {
            Map<String, String> docs = new HashMap<>();
            docs.put("email", email);
            docs.put("originalFilename", originalFilename);

            String docJson = objectMapper.writeValueAsString(docs);
            kafkaTemplate.send(KafkaConstants.STUDENT_DOCUMENT_VERIFICATION, docJson);
            System.out.println("Sent document verification data to Kafka topic: " + email);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
