package com.example.demo.service;

import com.example.demo.entity.Contact;
import com.example.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact saveMessage(Contact contact) {

        return contactRepository.save(contact);
    }
    
    public void deleteMessage(
        Long id
    ) {
        contactRepository.deleteById(id);
    }

    public List<Contact> getAllMessages() {
        return contactRepository.findAll();
    }
}