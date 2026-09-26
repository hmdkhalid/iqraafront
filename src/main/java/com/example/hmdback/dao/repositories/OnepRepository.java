package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Onep;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OnepRepository extends MongoRepository<Onep, String> {
}
