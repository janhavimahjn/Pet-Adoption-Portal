package com.example.demo.controller;

import com.example.demo.dto.FavoritePetDTO;
import com.example.demo.entity.Favorite;
import com.example.demo.entity.Pet;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.PetRepository;
import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Favorite addFavorite(
            @RequestBody Favorite favorite
    ) {

        boolean exists =
                favoriteRepository
                        .existsByUserIdAndPetId(
                                favorite.getUserId(),
                                favorite.getPetId()
                        );

        if (exists) {

            throw new RuntimeException(
                    "Pet already added to favorites"
            );
        }

        Favorite saved =
            favoriteRepository.save(
                    favorite
            );

        Pet pet =
            petRepository.findById(
                    favorite.getPetId()
            ).orElseThrow();

        notificationService.createNotification(
            favorite.getUserId(),
            pet.getName() +
            " added to favorites ❤️"
        );

        return saved;
    }

    @GetMapping("/{userId}")
    public List<Favorite> getFavorites(
            @PathVariable Long userId
    ) {

        return favoriteRepository.findByUserId( userId );
    }

    @GetMapping("/pets/{userId}")
    public List<FavoritePetDTO> getFavoritePets(
            @PathVariable Long userId
    ) {

        List<Favorite> favorites =
                favoriteRepository.findByUserId( userId );

        List<FavoritePetDTO> result = new ArrayList<>();

        for (Favorite fav : favorites) {

            petRepository.findById( fav.getPetId() ).ifPresent(pet -> {

                result.add(
                        new FavoritePetDTO( fav.getId(), pet )
                );
            });
        }

        return result;
    }

    @GetMapping("/pets/{userId}/{petId}")
    public Long getFavoriteId(
        @PathVariable Long userId,
        @PathVariable Long petId
    ) {

        List<Favorite> favorites =
            favoriteRepository.findByUserId( userId );

        for(Favorite fav : favorites){

            if(fav.getPetId().equals( petId )){

                return fav.getId();
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void removeFavorite(
            @PathVariable Long id
    ) {
        Favorite favorite =
            favoriteRepository
                    .findById(id)
                    .orElseThrow();

        Pet pet =
            petRepository.findById(
                    favorite.getPetId()
            ).orElseThrow();

        notificationService.createNotification(
            favorite.getUserId(),
            pet.getName() +
            " removed from favorites 💔"
        );
        favoriteRepository.deleteById(id);
    }
}