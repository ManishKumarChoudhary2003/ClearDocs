package backend.controller;

import backend.dto.AuthRequestDTO;
import backend.dto.AuthResponseDTO;
import backend.entity.PlatformUser;
import backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<PlatformUser> addNewUser(@RequestBody PlatformUser platformUser) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveUser(platformUser));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> getToken(@RequestBody AuthRequestDTO authRequestDTO) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
            );

            if (authenticate.isAuthenticated()) {
                PlatformUser platformUser = service.findByEmail(authRequestDTO.getEmail());

                String token = service.generateToken(platformUser.getEmail(), platformUser.getRoles());

                return ResponseEntity.ok(new AuthResponseDTO(
                        platformUser.getId(),
                        token,
                        platformUser.getEmail(),
                        platformUser.getRoles().stream().findFirst().orElse(null)
                ));
            } else {
                throw new RuntimeException("Invalid access");
            }
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        }
    }

}