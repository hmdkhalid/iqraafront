package com.example.hmdback.Services;


import com.example.hmdback.dao.entities.RevenuCompte;
import com.example.hmdback.dao.repositories.RevenuCompteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevenuCompteService {
    private final RevenuCompteRepository repository;

    public RevenuCompteService(RevenuCompteRepository repository) {
        this.repository = repository;
    }

    public List<RevenuCompte> getAll() {
        return repository.findAll();
    }

    public RevenuCompte save(RevenuCompte revenu) {
        return repository.save(revenu);
    }
    public void delete(String id) {
        repository.deleteById(id);
    }


    public double getTotalParEcole(String ecole) {
        return repository.findByEcole(ecole).stream()
                .mapToDouble(RevenuCompte::getMontant)
                .sum();
    }

    public double getTotalGeneral() {
        return repository.findAll().stream()
                .mapToDouble(RevenuCompte::getMontant)
                .sum();
    }
}
