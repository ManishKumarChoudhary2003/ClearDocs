package backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {

    private Long userId;

    private String token;

    private String email;

    private String role;
}
