package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Cnss;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CnssRepository extends MongoRepository<Cnss, String> {
    List<Cnss> findByType(String type);
}
