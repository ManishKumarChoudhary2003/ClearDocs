package backend.service;

import backend.entity.PlatformUser;
import backend.repository.PlatformUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public PlatformUser saveUser(PlatformUser platformUser) {
        platformUser.setPassword(passwordEncoder.encode(platformUser.getPassword()));
        PlatformUser savedUser = repository.save(platformUser);
        emailService.sendRegistrationSuccessEmail(platformUser);
        return savedUser;
    }

    public String generateToken(String email) {
        PlatformUser platformUser = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return jwtService.generateToken(email, platformUser.getRoles());
    }

}
