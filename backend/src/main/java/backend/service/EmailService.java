package backend.service;

import backend.dto.EmailRequestDTO;
import backend.entity.PlatformUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {


    @Autowired
    private NotificationService notificationService;


    public void sendRegistrationSuccessEmail(PlatformUser platformUser) {
        String username = platformUser.getUsername();
        String email = platformUser.getEmail();

        String emailBody = String.format(
                "Dear %s,\n\n" +
                        "Welcome to Clear Docs! Your registration was successful.\n\n" +
                        "Here are your details:\n" +
                        "- Username: %s\n" +
                        "- Email: %s\n\n" +
                        "We're excited to have you on board and look forward to providing you with a great experience. " +
                        "If you need any assistance, feel free to reach out.\n\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276"
                , username, username, email);

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Welcome to Clear Docs");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest);
    }


    public void sendRegistrationSuccessEmailToStudent(String email, String enrollmentNumber) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "We are pleased to inform you that your account has been successfully created by your institution.\n\n" +
                        "Here are your details:\n" +
                        "- Enrollment Number: %s\n\n" +
                        "You can now access the platform to manage your academic activities and resources.\n\n" +
                        "If you have any questions or need assistance, feel free to reach out to your institution's support team.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276"
                , enrollmentNumber);

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Your Clear Docs Account Has Been Created");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest);
    }

    public void sendUpdationEmailToStudent(String email) {
        String emailBody = "Dear Student,\n\n" +
                "This is to inform you that your account information has been successfully updated. " +
                "Please review the changes by logging into your account.\n\n" +
                "If you did not request this change or have any concerns, " +
                "please contact your institution's support team immediately.\n\n" +
                "Best regards,\n" +
                "The Clear Docs Team\n\n" +
                "Support: cmanishkumar193@gmail.com | Phone: 8955946276";

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Your Account Information Has Been Updated");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest);
    }

    public void sendDeletionEmailToStudent(String email) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "We would like to inform you that your account has been successfully deleted from our system.\n\n" +
                        "If this was a mistake or you have any concerns, please contact our support team for assistance.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276"
        );

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Account Deletion Confirmation");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest);
    }

    public void sendDocumentUploadedEmailToStudent(String email, String documentType) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "Your %s has been successfully uploaded to your account.\n\n" +
                        "If you have any questions, feel free to contact us.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276",
                documentType
        );

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Document Uploaded Successfully");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest); 
    }

    public void sendDocumentDeletedEmailToStudent(String email, String documentType) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "We want to inform you that your %s has been deleted from your account due to some reason.\n\n" +
                        "If you have any questions or need further assistance, please don't hesitate to reach out.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276",
                documentType
        );

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Document Deleted Notification");
        emailRequest.setBody(emailBody);

        notificationService.sendEmail(emailRequest);
    }

    public void sendDocumentVerifiedEmailToStudent(String email, String documentName) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "We are pleased to inform you that your document '%s' has been successfully verified.\n\n" +
                        "If you have any questions or need further assistance, please don't hesitate to reach out.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com | Phone: 8955946276",
                documentName
        );

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(email);
        emailRequest.setSubject("Document Verification Successful");
        emailRequest.setBody(emailBody);

        // Sending the email using the notification service
        notificationService.sendEmail(emailRequest);
    }

}
