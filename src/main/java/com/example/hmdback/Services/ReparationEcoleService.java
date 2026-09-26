package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.ReparationEcole;
import com.example.hmdback.dao.repositories.ReparationEcoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReparationEcoleService {

    private final ReparationEcoleRepository reparationEcoleRepository;

    public ReparationEcoleService(ReparationEcoleRepository reparationEcoleRepository) {
        this.reparationEcoleRepository = reparationEcoleRepository;
    }

    public List<ReparationEcole> getAllReparations() {
        return reparationEcoleRepository.findAll();
    }

    public List<ReparationEcole> getByType(String type) {
        return reparationEcoleRepository.findByType(type);
    }

    public ReparationEcole save(ReparationEcole reparationEcole) {
        return reparationEcoleRepository.save(reparationEcole);
    }

    public void deleteById(String id) {
        reparationEcoleRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(reparationEcoleRepository::deleteById);
    }

    // ✅ Nombre total
    public long getTotalCount() {
        return reparationEcoleRepository.count();
    }

    // ✅ Somme totale des prix
    public Double getTotalMontant() {
        return reparationEcoleRepository.findAll()
                .stream()
                .mapToDouble(ReparationEcole::getPrix)
                .sum();
    }
    public ReparationEcole update(String id, ReparationEcole reparationEcole) {
        ReparationEcole existing = reparationEcoleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réparation introuvable avec id " + id));

        existing.setDate(reparationEcole.getDate());
        existing.setType(reparationEcole.getType());
        existing.setPrix(reparationEcole.getPrix());

        return reparationEcoleRepository.save(existing);
    }

}
