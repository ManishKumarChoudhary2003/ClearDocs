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
        String emailBody = String.format(
                "Dear %s,\n\n" +
                        "Welcome to Clear Docs! Your registration was successful.\n\n" +
                        "Here are your details:\n" +
                        "- Username: %s\n" +
                        "- Email: %s\n\n" +
                        "We're excited to have you on board! If you need any assistance, feel free to reach out.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com\n" +
                        "Phone: 8955946276",
                platformUser.getUsername(), platformUser.getUsername(), platformUser.getEmail());

        sendEmail(platformUser.getEmail(), "Welcome to Clear Docs", emailBody);
    }

    public void sendRegistrationSuccessEmailToStudent(String email, String enrollmentNumber) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "Your institution has successfully created your account on Clear Docs.\n\n" +
                        "Enrollment Number: %s\n\n" +
                        "You can now access the platform to manage your academic activities. If you have any questions, please contact your institution's support team.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com\n" +
                        "Phone: 8955946276",
                enrollmentNumber);

        sendEmail(email, "Your Clear Docs Account Has Been Created", emailBody);
    }

    public void sendUpdationEmailToStudent(String email) {
        String emailBody = "Dear Student,\n\n" +
                "Your account information has been successfully updated. Please review the changes by logging into your account.\n\n" +
                "If you did not request this change, please contact your institution's support team immediately.\n\n" +
                "Best regards,\n" +
                "The Clear Docs Team\n\n" +
                "Support: cmanishkumar193@gmail.com\n" +
                "Phone: 8955946276";

        sendEmail(email, "Your Account Information Has Been Updated", emailBody);
    }

    public void sendDeletionEmailToStudent(String email) {
        String emailBody = "Dear Student,\n\n" +
                "Your account has been successfully deleted from our system. If this was a mistake or you have any concerns, please contact our support team for assistance.\n\n" +
                "Best regards,\n" +
                "The Clear Docs Team\n\n" +
                "Support: cmanishkumar193@gmail.com\n" +
                "Phone: 8955946276";

        sendEmail(email, "Account Deletion Confirmation", emailBody);
    }

    public void sendDocumentUploadedEmailToStudent(String email, String documentType) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "Your %s has been successfully uploaded to your account.\n\n" +
                        "If you have any questions, feel free to contact us.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com\n" +
                        "Phone: 8955946276",
                documentType);

        sendEmail(email, "Document Uploaded Successfully", emailBody);
    }

    public void sendDocumentDeletedEmailToStudent(String email, String documentType) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "Your %s has been deleted from your account. If this was not intentional, please reach out for support.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com\n" +
                        "Phone: 8955946276",
                documentType);

        sendEmail(email, "Document Deleted Notification", emailBody);
    }

    public void sendDocumentVerifiedEmailToStudent(String email, String documentName) {
        String emailBody = String.format(
                "Dear Student,\n\n" +
                        "Your document '%s' has been successfully verified.\n\n" +
                        "If you have any questions or need assistance, feel free to reach out.\n\n" +
                        "Best regards,\n" +
                        "The Clear Docs Team\n\n" +
                        "Support: cmanishkumar193@gmail.com\n" +
                        "Phone: 8955946276",
                documentName);

        sendEmail(email, "Document Verification Successful", emailBody);
    }

    private void sendEmail(String to, String subject, String body) {
        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setTo(to);
        emailRequest.setSubject(subject);
        emailRequest.setBody(body);
        notificationService.sendEmail(emailRequest);
    }
}
