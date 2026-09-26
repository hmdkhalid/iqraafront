package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.ReparationEcole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReparationEcoleRepository extends MongoRepository<ReparationEcole, String> {
    // Recherche par type
    List<ReparationEcole> findByType(String type);
}
