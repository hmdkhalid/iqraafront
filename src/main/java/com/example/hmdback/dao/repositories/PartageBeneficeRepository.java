package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.PartageBenefice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartageBeneficeRepository extends MongoRepository<PartageBenefice, String> {
}
