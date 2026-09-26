package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Impots;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImpotsRepository extends MongoRepository<Impots, String> {

    // Rechercher les impôts par type
    List<Impots> findByType(String type);

}
