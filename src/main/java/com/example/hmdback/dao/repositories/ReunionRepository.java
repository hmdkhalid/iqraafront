package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Reunion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReunionRepository extends MongoRepository<Reunion, String> {
    // 🔎 recherche par type
    List<Reunion> findByType(String type);
}
