package backend.controller;

import backend.dto.AuthRequestDTO;
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
    public ResponseEntity<String> getToken(@RequestBody AuthRequestDTO authRequestDTO) {
        System.out.println("login api:::");

        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
            );

            System.out.println(authenticate.getAuthorities() + " -------------------------- " + authenticate.isAuthenticated());

            if (authenticate.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.OK).body(service.generateToken(authRequestDTO.getEmail()));
            } else {
                throw new RuntimeException("invalid access");
            }
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        }
    }


    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}