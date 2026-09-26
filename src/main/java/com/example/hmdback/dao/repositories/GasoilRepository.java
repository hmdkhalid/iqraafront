package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Gasoil;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GasoilRepository extends MongoRepository<Gasoil, String> {

    // Récupérer tous les paiements pour une voiture donnée
    List<Gasoil> findByVoiture_Id(String voitureId);

    // Récupérer tous les paiements par matricule (si besoin)
    List<Gasoil> findByVoiture_Matricule(String matricule);
}
