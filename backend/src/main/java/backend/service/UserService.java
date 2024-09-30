package backend.service;

import backend.entity.PlatformUser;
import backend.repository.PlatformUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private PlatformUserRepository platformUserRepository;


    public Optional<PlatformUser> getUserById(Long id) {
        return platformUserRepository.findById(id);
    }
}
