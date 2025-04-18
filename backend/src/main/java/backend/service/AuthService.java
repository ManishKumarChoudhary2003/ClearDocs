package backend.service;

import backend.entity.PlatformUser;
import backend.entity.PlatformUserElastic;
import backend.mapper.PlatformUserMapper;
import backend.messaging.KafkaProducer;
import backend.repository.elastic.PlatformUserElasticsearchRepository;
import backend.repository.jpa.PlatformUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private PlatformUserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;


    @Autowired
    private JwtService jwtService;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private PlatformUserElasticsearchRepository platformUserElasticsearchRepository;

    public PlatformUser saveUser(PlatformUser platformUser) {
        platformUser.setPassword(passwordEncoder.encode(platformUser.getPassword()));

        PlatformUserElastic platformUserElastic = new PlatformUserElastic();
        PlatformUserElastic userElastic = PlatformUserMapper.mapToElastic(platformUser, platformUserElastic);

        PlatformUserElastic saved = platformUserElasticsearchRepository.save(userElastic);
        platformUser.setPlatformUserElasticId(saved.getId());

        PlatformUser savedUser = repository.save(platformUser);
        if (kafkaProducer != null){
            kafkaProducer.producerForRegistration(savedUser);
        }
        return savedUser;
    }

    public String generateToken(String email, Set<String> roles) {
//        PlatformUser platformUser = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return jwtService.generateToken(email, roles);
    }

    public PlatformUser findByEmail(String email) {
       return repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
