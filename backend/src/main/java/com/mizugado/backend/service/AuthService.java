package com.mizugado.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.mizugado.backend.dto.SignUpRequest;
import com.mizugado.backend.model.User;
import com.mizugado.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    public void registerUser(SignUpRequest signUpRequest) {
        if (userRepository.findByUsername(signUpRequest.username()).isPresent()) {
            throw new IllegalStateException("Username is already taken");
        }
        User user = new User();
        user.setUsername(signUpRequest.username());
        // Saves password directly without encoding
        user.setPassword(signUpRequest.password());

        userRepository.save(user);
    }

    public Authentication loginUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        return authentication;
    }
}
