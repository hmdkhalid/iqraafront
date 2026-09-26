package com.example.hmdback.dao.repositories;

import com.example.hmdback.dao.entities.Credit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends MongoRepository<Credit, String> {
    List<Credit> findByEcole(String ecole);
    List<Credit> findByNomPersonne(String nomPersonne);
    List<Credit> findByAnnee(Integer annee);
    List<Credit> findByEcoleAndAnnee(String ecole, Integer annee);

    // 🔹 recherche par total (optionnel si tu veux)
    List<Credit> findByTotal(Double total);
}
