package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Assurance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssuranceRepository extends MongoRepository<Assurance, String> {

    // Rechercher les assurances par type
    List<Assurance> findByType(String type);
}
