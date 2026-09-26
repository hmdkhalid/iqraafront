package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Reunion;
import com.example.hmdback.dao.repositories.ReunionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReunionService {

    private final ReunionRepository reunionRepository;

    public ReunionService(ReunionRepository reunionRepository) {
        this.reunionRepository = reunionRepository;
    }

    public List<Reunion> getAllReunions() {
        return reunionRepository.findAll();
    }

    public List<Reunion> getByType(String type) {
        return reunionRepository.findByType(type);
    }

    public Reunion save(Reunion reunion) {
        return reunionRepository.save(reunion);
    }

    public void deleteById(String id) {
        reunionRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(reunionRepository::deleteById);
    }

    // ✅ Somme totale des montants
    public Double getTotalMontant() {
        return reunionRepository.findAll()
                .stream()
                .mapToDouble(Reunion::getMontant)
                .sum();
    }
    public Reunion updateReunion(String id, Reunion reunionDetails) {
        return reunionRepository.findById(id)
                .map(existing -> {
                    existing.setType(reunionDetails.getType());
                    existing.setDate(reunionDetails.getDate());
                    existing.setMontant(reunionDetails.getMontant());
                    return reunionRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Réunion introuvable avec id: " + id));
    }

}
