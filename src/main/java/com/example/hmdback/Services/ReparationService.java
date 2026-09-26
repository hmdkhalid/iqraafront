package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Reparation;
import com.example.hmdback.dao.repositories.ReparationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReparationService {

    private final ReparationRepository repository;

    public ReparationService(ReparationRepository repository) {
        this.repository = repository;
    }

    public List<Reparation> getAll() {
        return repository.findAll();
    }

    public List<Reparation> getByMatricule(String matricule) {
        return repository.findByMatricule(matricule);
    }

    public Reparation save(Reparation r) {
        return repository.save(r);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public double getTotalMontant() {
        return repository.findAll().stream().mapToDouble(Reparation::getMontant).sum();
    }
}
