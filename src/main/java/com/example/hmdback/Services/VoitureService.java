package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Voiture;
import com.example.hmdback.dao.repositories.VoitureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureService {

    private final VoitureRepository voitureRepository;

    public VoitureService(VoitureRepository voitureRepository) {
        this.voitureRepository = voitureRepository;
    }

    // ✅ Lister toutes les voitures
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    // ✅ Ajouter une voiture
    public Voiture save(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    // ✅ Modifier une voiture
    public Voiture update(String id, Voiture voiture) {
        return voitureRepository.findById(id)
                .map(v -> {
                    v.setMatricule(voiture.getMatricule());
                    return voitureRepository.save(v);
                })
                .orElseThrow(() -> new RuntimeException("Voiture non trouvée avec id : " + id));
    }

    // ✅ Supprimer une voiture par ID
    public void delete(String id) {
        voitureRepository.deleteById(id);
    }

    // ✅ Nombre total de voitures
    public long getTotalCount() {
        return voitureRepository.count();
    }
}
