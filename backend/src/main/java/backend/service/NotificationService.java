package backend.service;

import backend.dto.EmailRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(EmailRequestDTO emailRequestDTO) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(emailRequestDTO.getTo());
        simpleMailMessage.setSubject(emailRequestDTO.getSubject());
        simpleMailMessage.setText(emailRequestDTO.getBody());
        javaMailSender.send(simpleMailMessage);
    }
}