package com.example.demo.controller;

import com.example.demo.entity.Pet;
import com.example.demo.repository.PetRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.NotificationService;
import com.example.demo.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetService petService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private PetRepository petRepository;
    
    @GetMapping
    public List<Pet> getAllPets() {

        return petService.getAllPets();
    }

    @GetMapping("/{id}")
    public Pet getPetById(
        @PathVariable Long id
    ) {

        return petService.getPetById(id);
    }
    
    @GetMapping("/search")
    public List<Pet> searchPets(
        @RequestParam String keyword
    ) {

        return petService.searchPets(
            keyword
        );
    }

    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        Pet savedPet =
            petService.addPet(pet);

    userRepository.findAll()
            .stream()
            .filter(user ->
                    user.getRole()
                            .equals("USER"))
            .forEach(user ->

                    notificationService
                            .createNotification(
                                    user.getId(),
                                    "New pet available: "
                                    + savedPet.getName()
                            )
            );

    return savedPet;
    }
    
    @PutMapping("/{id}")
    public Pet updatePet(

        @PathVariable Long id,

        @RequestBody Pet pet
    ) {

        return petService.updatePet(id, pet);
    }

    @DeleteMapping("/{id}")
    public void deletePet(
            @PathVariable Long id
    ) {

        petService.deletePet(id);
    }
}