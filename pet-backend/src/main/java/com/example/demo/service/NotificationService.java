package com.example.demo.service;

import com.example.demo.entity.Notification;
import com.example.demo.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(
            Long userId,
            String message
    ) {

        Notification notification =
                new Notification();

        notification.setUserId(userId);

        notification.setMessage(message);

        notification.setRead(false);

        notification.setCreatedAt(
                LocalDateTime.now().toString()
        );

        notificationRepository.save(
                notification
        );
        System.out.println(
            "Notification Saved : "
            + message
        );
    }
}