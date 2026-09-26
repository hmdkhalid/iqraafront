package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Presson;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PressonRepository extends MongoRepository<Presson, String> {
}
