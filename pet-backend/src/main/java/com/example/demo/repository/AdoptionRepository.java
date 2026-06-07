package com.example.demo.repository;

import com.example.demo.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AdoptionRepository
        extends JpaRepository<AdoptionRequest, Long> {

    List<AdoptionRequest> findByUser_Id(Long userId);

    List<AdoptionRequest> findByUser_IdAndPet_Id(
        Long userId,
        Long petId
    );

    @Transactional
    void deleteByPetId(Long petId);
}