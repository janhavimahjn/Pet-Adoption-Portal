package com.example.demo.controller;

import com.example.demo.entity.Contact;
import com.example.demo.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public Contact saveMessage(
            @RequestBody Contact contact
    ) {

        return contactService.saveMessage(contact);
    }

    @GetMapping
    public List<Contact> getAllMessages() {

        return contactService.getAllMessages();
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(
        @PathVariable Long id
    ) {
        contactService.deleteMessage(id);
    }
}