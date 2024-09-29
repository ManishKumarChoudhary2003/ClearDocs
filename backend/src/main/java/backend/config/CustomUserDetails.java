package backend.config;

import backend.entity.PlatformUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private final PlatformUser platformUser;

    public CustomUserDetails(PlatformUser userCredential) {
        this.platformUser = userCredential;
    }

    public PlatformUser getUserCredential() {
        return platformUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return platformUser.getRoles()
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return platformUser.getPassword();
    }

    @Override
    public String getUsername() {
        return platformUser.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
