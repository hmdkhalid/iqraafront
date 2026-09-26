package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Accident;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccidentRepository extends MongoRepository<Accident, String> {
    List<Accident> findByType(String type);
}
