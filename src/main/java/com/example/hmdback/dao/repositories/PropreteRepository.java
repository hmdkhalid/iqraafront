package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Proprete;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropreteRepository extends MongoRepository<Proprete, String> {
    List<Proprete> findByType(String type);
}
