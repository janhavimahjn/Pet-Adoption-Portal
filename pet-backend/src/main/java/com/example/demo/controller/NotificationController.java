package com.example.demo.controller;

import com.example.demo.entity.Notification;
import com.example.demo.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable Long userId
    ) {

        return notificationRepository
                .findByUserIdOrderByIdDesc(
                        userId
                );
    }

    @GetMapping("/count/{userId}")
    public long unreadCount(
            @PathVariable Long userId
    ) {

        return notificationRepository
                .countByUserIdAndIsReadFalse(
                        userId
                );
    }

    @PutMapping("/read/{id}")
    public Notification markRead(
            @PathVariable Long id
    ) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElseThrow();

        notification.setRead(true);

        return notificationRepository.save(
                notification
        );
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable Long id
    ) {

        notificationRepository.deleteById(id);
    }
}