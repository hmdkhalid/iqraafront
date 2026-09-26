package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Assurance;
import com.example.hmdback.dao.repositories.AssuranceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssuranceService {

    private final AssuranceRepository assuranceRepository;

    public AssuranceService(AssuranceRepository assuranceRepository) {
        this.assuranceRepository = assuranceRepository;
    }

    public List<Assurance> getAllAssurances() {
        return assuranceRepository.findAll();
    }

    public List<Assurance> getByType(String type) {
        return assuranceRepository.findByType(type);
    }

    public Assurance save(Assurance assurance) {
        return assuranceRepository.save(assurance);
    }

    public void deleteById(String id) {
        assuranceRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(assuranceRepository::deleteById);
    }

    // 🔹 Standardisé pour Dashboard
    public long getTotalCount() {
        return assuranceRepository.count();
    }

    public Double getTotalMontantPaiements() {
        return assuranceRepository.findAll()
                .stream()
                .mapToDouble(Assurance::getPrix)
                .sum();
    }


}
