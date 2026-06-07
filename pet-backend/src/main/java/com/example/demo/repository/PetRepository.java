package com.example.demo.repository;

import com.example.demo.entity.Pet;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByNameContainingIgnoreCaseOrTypeContainingIgnoreCaseOrBreedContainingIgnoreCase(
        String name,
        String type,
        String breed
    );
}