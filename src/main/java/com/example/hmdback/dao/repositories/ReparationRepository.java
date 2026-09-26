package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Reparation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReparationRepository extends MongoRepository<Reparation, String> {
    List<Reparation> findByMatricule(String matricule);
}
