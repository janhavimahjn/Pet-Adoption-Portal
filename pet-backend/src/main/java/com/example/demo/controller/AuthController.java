package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.NotificationService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

      if (user.getRole() == null) {

        user.setRole("USER");

      } else {

        user.setRole(
            user.getRole().toUpperCase()
        );
      }
    User savedUser =
        userService.registerUser(user);

    notificationService.createNotification(
        savedUser.getId(),
        "Welcome to Pet Adoption Portal ❤️"
    );

    return savedUser;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = JwtUtil.generateToken(
        user.getEmail(),
        user.getRole()
);

        return new LoginResponse(
           token,
           user.getId(),
           user.getRole()
        );
    }
}