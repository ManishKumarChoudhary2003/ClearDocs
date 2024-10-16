package backend.messaging;


import backend.entity.PlatformUser;
import backend.service.EmailService;
import backend.utils.KafkaConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaConstants.REGISTRATION_TOPIC, groupId = KafkaConstants.GROUP_EMAIL)
    public void consume(String message) {
        try {
            PlatformUser platformUser = objectMapper.readValue(message, PlatformUser.class);
            emailService.sendRegistrationSuccessEmail(platformUser);
            System.out.println("Registration email sent to: " + platformUser.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}