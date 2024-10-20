package backend.messaging;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import backend.entity.PlatformUser;
import backend.service.EmailService;
import backend.utils.KafkaConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KafkaConsumer {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaConstants.REGISTRATION_TOPIC, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForUserRegistration(String message) {
        try {
            PlatformUser platformUser = objectMapper.readValue(message, PlatformUser.class);
            emailService.sendRegistrationSuccessEmail(platformUser);
            System.out.println("Registration email sent to: " + platformUser.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = KafkaConstants.STUDENT_REGISTRATION, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForStudentRegistration(String message) throws JsonProcessingException {
        Map<String, String> studentData = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});

        String email = studentData.get("email");
        String enrollmentNumber = studentData.get("enrollmentNumber");
        emailService.sendRegistrationSuccessEmailToStudent(email, enrollmentNumber);
        System.out.println("Registration email sent to: " + email);
    }

    @KafkaListener(topics = KafkaConstants.STUDENT_UPDATION, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForStudentUpdation(String message) {
        try {
            emailService.sendUpdationEmailToStudent(message);
            System.out.println("Updation email sent to: " + message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = KafkaConstants.STUDENT_DELETION, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForStudentDeletion(String message) {
        try {
            emailService.sendDeletionEmailToStudent(message);
            System.out.println("Deletion email sent to: " + message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = KafkaConstants.STUDENT_DOCUMENT_UPLOAD, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForDocumentUpload(String message) throws JsonProcessingException {
        Map<String, String> docs = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});

        String email = docs.get("email");
        String documentType = docs.get("documentType");
        emailService.sendDocumentUploadedEmailToStudent(email, documentType);
        System.out.println("Document Upload email sent to: " + email);
    }

    @KafkaListener(topics = KafkaConstants.STUDENT_DOCUMENT_DELETE, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForDocumentDelete(String message) throws JsonProcessingException {
        Map<String, String> docs = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});

        String email = docs.get("email");
        String documentType = docs.get("documentType");
        emailService.sendDocumentDeletedEmailToStudent(email, documentType);
        System.out.println("Document Delete email sent to: " + email);
    }


    @KafkaListener(topics = KafkaConstants.STUDENT_DOCUMENT_VERIFICATION, groupId = KafkaConstants.GROUP_EMAIL)
    public void consumerForDocumentVerification(String message) throws JsonProcessingException {
        Map<String, String> docs = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});

        String email = docs.get("email");
        String originalFilename = docs.get("originalFilename");
        emailService.sendDocumentVerifiedEmailToStudent(email, originalFilename);
        System.out.println("Document Verification email sent to: " + email);
    }


}