package backend.messaging;


import backend.entity.PlatformUser;
import backend.utils.KafkaConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

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
}
