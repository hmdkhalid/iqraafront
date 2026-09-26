package com.example.hmdback.dao.repositories;


import com.example.hmdback.dao.entities.RevenuEspece;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RevenuEspeceRepository extends MongoRepository<RevenuEspece, String> {
    List<RevenuEspece> findByEcole(String ecole);
}
