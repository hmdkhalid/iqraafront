package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Revenus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenusRepository extends MongoRepository<Revenus, String> {
}
