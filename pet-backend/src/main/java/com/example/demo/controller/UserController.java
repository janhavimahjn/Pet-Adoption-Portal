package com.example.demo.controller;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.PasswordDTO;
import com.example.demo.dto.ProfileStatsDTO;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.AdoptionRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private AdoptionRepository adoptionRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public User getUser(
        @PathVariable Long id
    ) {
        return userRepository
            .findById(id)
            .orElseThrow();
    }
    
    @GetMapping("/stats/{userId}")
    public ProfileStatsDTO getStats(
        @PathVariable Long userId
    ) {
        ProfileStatsDTO dto =
            new ProfileStatsDTO();
        dto.setFavoriteCount(
            favoriteRepository
                    .findByUserId(userId)
                    .size()
        );
        dto.setRequestCount(
            adoptionRepository
                    .findByUser_Id(userId)
                    .size()
        );
        long approved =
            adoptionRepository
                    .findByUser_Id(userId)
                    .stream()
                    .filter(a ->
                            a.getStatus()
                             .equals("APPROVED"))
                    .count();
        dto.setAdoptedCount(
            approved
        );
        return dto;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(
            @PathVariable Long id
    ) {
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User updateRole(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        User user =
                userRepository.findById(id).orElseThrow();
        user.setRole(updatedUser.getRole());
        return userRepository.save(user);
    }

    @PutMapping("/profile/{id}")
    public User updateProfile(
        @PathVariable Long id,
        @Valid @RequestBody User updated
    ) {
        if(!updated.getPhone()
            .matches("^[6-9]\\d{9}$")) {

            throw new RuntimeException(
                "Invalid Indian Mobile Number"
            );
        }

        User user =
            userRepository
                    .findById(id)
                    .orElseThrow();

        user.setName(updated.getName());
        user.setPhone(updated.getPhone());
        user.setAddress(updated.getAddress());

        return userRepository.save(user);
    }

    @PutMapping("/change-password/{id}")
    public String changePassword(
        @PathVariable Long id,
        @RequestBody PasswordDTO dto
    ) {
        User user =
            userRepository
                    .findById(id)
                    .orElseThrow();

        user.setPassword(
            passwordEncoder.encode(
                    dto.getNewPassword()
            )
        );
        userRepository.save(user);
        return "Password Updated";
    }

    @PostMapping("/upload-photo/{id}")
    public User uploadPhoto(
        @PathVariable Long id,
        @RequestParam("file") MultipartFile file
    ) throws Exception {

        User user =
            userRepository
                    .findById(id)
                    .orElseThrow();

        String uploadDir =
            "src/main/resources/static/uploads/profile/";

        Files.createDirectories(
            Paths.get(uploadDir)
        );

        String fileName =
            UUID.randomUUID()
            + "_"
            + file.getOriginalFilename();

        Path path =
            Paths.get(
                    uploadDir +
                    fileName
            );

        Files.copy(
            file.getInputStream(),
            path,
            StandardCopyOption.REPLACE_EXISTING
        );

        user.setProfilePhoto(
            fileName
        );

        return userRepository.save(
            user
        );
    }
}