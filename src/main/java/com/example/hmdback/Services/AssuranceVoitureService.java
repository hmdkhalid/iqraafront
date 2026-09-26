package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.AssuranceVoiture;
import com.example.hmdback.dao.repositories.AssuranceVoitureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssuranceVoitureService {

    private final AssuranceVoitureRepository repository;

    public AssuranceVoitureService(AssuranceVoitureRepository repository) {
        this.repository = repository;
    }

    public List<AssuranceVoiture> getAll() {
        return repository.findAll();
    }

    public List<AssuranceVoiture> getByMatricule(String matricule) {
        return repository.findByMatricule(matricule);
    }

    public AssuranceVoiture save(AssuranceVoiture assurance) {
        return repository.save(assurance);
    }

    public AssuranceVoiture update(String id, AssuranceVoiture assurance) {
        AssuranceVoiture existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assurance non trouvée avec id " + id));

        existing.setMatricule(assurance.getMatricule());
        existing.setPrixAssurance(assurance.getPrixAssurance());
        existing.setPrixVisite(assurance.getPrixVisite());
        existing.setTotalAssurance(assurance.getTotalAssurance());
        existing.setTotalVisite(assurance.getTotalVisite());

        return repository.save(existing);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(repository::deleteById);
    }

    // ✅ Calculs
    public Double getTotalAssurance() {
        return repository.findAll().stream()
                .mapToDouble(a -> a.getPrixAssurance() != null ? a.getPrixAssurance() : 0.0)
                .sum();
    }

    public Double getTotalVisite() {
        return repository.findAll().stream()
                .mapToDouble(a -> a.getPrixVisite() != null ? a.getPrixVisite() : 0.0)
                .sum();
    }
}
