package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Presson;
import com.example.hmdback.dao.repositories.PressonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PressonService {

    private final PressonRepository pressonRepository;

    public PressonService(PressonRepository pressonRepository) {
        this.pressonRepository = pressonRepository;
    }

    // 🔹 Récupérer tous les pressons
    public List<Presson> getAll() {
        return pressonRepository.findAll();
    }

    // 🔹 Sauvegarder ou mettre à jour un presson
    public Presson save(Presson presson) {
        return pressonRepository.save(presson);
    }

    // 🔹 Supprimer par ID
    public void deleteById(String id) {
        pressonRepository.deleteById(id);
    }

    // 🔹 Supprimer plusieurs pressons d’un coup
    public void deleteMany(List<String> ids) {
        ids.forEach(pressonRepository::deleteById);
    }

    // 🔹 Calculer le total de tous les montants des paiements
    public Double calculerTotalPaiements() {
        return pressonRepository.findAll()
                .stream()
                .flatMap(p -> p.getPaiements().stream())
                .mapToDouble(paiement -> paiement.getMontant() != null ? paiement.getMontant() : 0.0)
                .sum();
    }
}
