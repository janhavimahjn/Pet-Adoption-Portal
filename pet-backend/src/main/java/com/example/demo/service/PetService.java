package com.example.demo.service;

import com.example.demo.entity.Pet;
import com.example.demo.repository.AdoptionRepository;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.PetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {
    @Autowired
    private AdoptionRepository adoptionRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private PetRepository petRepository;

    PetService(FavoriteRepository favoriteRepository, AdoptionRepository adoptionRepository) {
        this.favoriteRepository = favoriteRepository;
        this.adoptionRepository = adoptionRepository;
    }

    // Get All Pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    public Pet getPetById(Long id) {

         return petRepository.findById(id)
            .orElseThrow();
    }
    // Add New Pet
    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }
    // Delete Pet
    @Transactional
    public void deletePet(Long id) {
        
        favoriteRepository.deleteByPetId(id);
        adoptionRepository.deleteByPetId(id);
        petRepository.deleteById(id);
    }
    // Update Pet
    public Pet updatePet(
        Long id,
        Pet updatedPet
    ) {

        Pet pet = petRepository.findById(id)
            .orElseThrow();

        pet.setName(updatedPet.getName());

        pet.setType(updatedPet.getType());

        pet.setBreed(updatedPet.getBreed());

        pet.setAge(updatedPet.getAge());

        pet.setGender(updatedPet.getGender());

        pet.setStatus(updatedPet.getStatus());

        pet.setDescription(updatedPet.getDescription());

        pet.setVaccination(updatedPet.getVaccination());

        pet.setLocation(updatedPet.getLocation());

        pet.setImageUrl(updatedPet.getImageUrl());

        pet.setAdoptionFee(updatedPet.getAdoptionFee());

        return petRepository.save(pet);
    }
    public List<Pet> searchPets(
        String keyword
    ) {

    return petRepository
        .findByNameContainingIgnoreCaseOrTypeContainingIgnoreCaseOrBreedContainingIgnoreCase(
            keyword,
            keyword,
            keyword
        );
    }
}