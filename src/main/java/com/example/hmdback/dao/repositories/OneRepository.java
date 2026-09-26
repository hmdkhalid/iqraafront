package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.One;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OneRepository extends MongoRepository<One, String> {
}
