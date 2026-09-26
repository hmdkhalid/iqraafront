package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.EquipementEcole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipementEcoleRepository extends MongoRepository<EquipementEcole, String> {
    List<EquipementEcole> findByEcole(String ecole);
    List<EquipementEcole> findByNom(String nom);
}
