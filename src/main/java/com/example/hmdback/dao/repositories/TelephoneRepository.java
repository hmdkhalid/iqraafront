package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Telephone;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TelephoneRepository extends MongoRepository<Telephone, String> {}
