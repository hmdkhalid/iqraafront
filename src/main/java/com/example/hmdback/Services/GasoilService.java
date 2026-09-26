package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Gasoil;
import com.example.hmdback.dao.entities.Voiture;
import com.example.hmdback.dao.repositories.GasoilRepository;
import com.example.hmdback.dao.repositories.VoitureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GasoilService {

    private final GasoilRepository gasoilRepository;
    private final VoitureRepository voitureRepository;

    public GasoilService(GasoilRepository gasoilRepository, VoitureRepository voitureRepository) {
        this.gasoilRepository = gasoilRepository;
        this.voitureRepository = voitureRepository;
    }

    public Gasoil create(String voitureId, Gasoil gasoil) {
        Optional<Voiture> voitureOpt = voitureRepository.findById(voitureId);
        if (voitureOpt.isEmpty()) {
            throw new RuntimeException("Voiture non trouvée avec ID: " + voitureId);
        }
        gasoil.setVoiture(voitureOpt.get());
        return gasoilRepository.save(gasoil);
    }

    public List<Gasoil> getAll() {
        return gasoilRepository.findAll();
    }

    public Optional<Gasoil> getById(String id) {
        return gasoilRepository.findById(id);
    }

    public List<Gasoil> getByVoiture(String voitureId) {
        return gasoilRepository.findByVoiture_Id(voitureId);
    }

    public void delete(String id) {
        gasoilRepository.deleteById(id);
    }

    public Gasoil update(String id, String voitureId, Gasoil gasoil) {
        Optional<Voiture> voitureOpt = voitureRepository.findById(voitureId);
        if (voitureOpt.isEmpty()) {
            throw new RuntimeException("Voiture non trouvée avec ID: " + voitureId);
        }
        gasoil.setId(id);
        gasoil.setVoiture(voitureOpt.get());
        return gasoilRepository.save(gasoil);
    }

    // 🔹 Standardisé pour Dashboard
    public long getTotalCount() {
        return gasoilRepository.count();
    }


    public Double getTotalMontant() {
        return gasoilRepository.findAll()
                .stream()
                .mapToDouble(g -> g.getPaiements() != null
                        ? g.getPaiements().stream()
                        .mapToDouble(p -> p.getMontant() != null ? p.getMontant() : 0.0)
                        .sum()
                        : 0.0)
                .sum();
    }




}
