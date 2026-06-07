package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public User registerUser(User user) {
        user.setPassword(
            passwordEncoder.encode(
                user.getPassword()
            )
        );
        if(user.getRole() == null){
            user.setRole("USER");
        }
        return userRepository.save(user);
    }

    // Get User By Id
    public User getUserById(Long id) {
        return userRepository
                .findById(id)
                .orElseThrow();
    }

    // Update Profile
    public User updateProfile(
            Long id,
            User updatedUser
    ) {
        User user =
                userRepository
                        .findById(id)
                        .orElseThrow();
        user.setName(
                updatedUser.getName()
        );
        user.setPhone(
                updatedUser.getPhone()
        );
        user.setAddress(
                updatedUser.getAddress()
        );
        return userRepository.save(user);
    }

    // Change Password
    public void changePassword(
            Long id,
            String newPassword
    ) {
        User user =
                userRepository
                        .findById(id)
                        .orElseThrow();
        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );
        userRepository.save(user);
    }
}