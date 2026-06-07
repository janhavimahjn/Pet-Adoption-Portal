package com.example.demo.dto;

import com.example.demo.entity.Pet;

public class FavoritePetDTO {

    private Long favoriteId;
    private Pet pet;

    public FavoritePetDTO(
            Long favoriteId,
            Pet pet
    ) {
        this.favoriteId = favoriteId;
        this.pet = pet;
    }

    public Long getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(Long favoriteId) {
        this.favoriteId = favoriteId;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}