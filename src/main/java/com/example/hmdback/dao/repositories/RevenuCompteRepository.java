package com.example.hmdback.dao.repositories;


import com.example.hmdback.dao.entities.RevenuCompte;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RevenuCompteRepository extends MongoRepository<RevenuCompte, String> {
    List<RevenuCompte> findByEcole(String ecole);
}
