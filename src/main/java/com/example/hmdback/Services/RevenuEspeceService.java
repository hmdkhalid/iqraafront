package com.example.hmdback.Services;


import com.example.hmdback.dao.entities.RevenuEspece;
import com.example.hmdback.dao.repositories.RevenuEspeceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevenuEspeceService {
    private final RevenuEspeceRepository repository;

    public RevenuEspeceService(RevenuEspeceRepository repository) {
        this.repository = repository;
    }

    public List<RevenuEspece> getAll() {
        return repository.findAll();
    }

    public RevenuEspece save(RevenuEspece revenu) {
        return repository.save(revenu);
    }

    public double getTotalParEcole(String ecole) {
        return repository.findByEcole(ecole).stream()
                .mapToDouble(RevenuEspece::getMontant)
                .sum();
    }
    public void delete(String id) {
        repository.deleteById(id);
    }

    public double getTotalGeneral() {
        return repository.findAll().stream()
                .mapToDouble(RevenuEspece::getMontant)
                .sum();
    }
}
