package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Bibliotheque;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BibliothequeRepository extends MongoRepository<Bibliotheque, String> {
    // Recherche par type/catégorie
    List<Bibliotheque> findByType(String type);

}
