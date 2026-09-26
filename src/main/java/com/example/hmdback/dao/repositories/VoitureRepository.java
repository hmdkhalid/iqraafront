package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Voiture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoitureRepository extends MongoRepository<Voiture, String> {
    // Si tu veux chercher par matricule
    Voiture findByMatricule(String matricule);
}
