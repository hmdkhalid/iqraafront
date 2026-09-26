package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.AssuranceVoiture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssuranceVoitureRepository extends MongoRepository<AssuranceVoiture, String> {
    List<AssuranceVoiture> findByMatricule(String matricule);
}
