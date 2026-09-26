package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Onep;
import com.example.hmdback.dao.repositories.OnepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnepService {

    private final OnepRepository repo;

    public OnepService(OnepRepository repo) {
        this.repo = repo;
    }

    // ✅ Récupérer tous les ONEP
    public List<Onep> getAll() {
        return repo.findAll();
    }

    // ✅ Sauvegarder et recalculer le total
    public Onep save(Onep onep) {
        if (onep.getPaiements() != null) {
            onep.setTotal(onep.getPaiements().stream()
                    .mapToDouble(p -> p.getMontant() != null ? p.getMontant() : 0.0)
                    .sum());
        } else {
            onep.setTotal(0.0);
        }
        return repo.save(onep);
    }

    // ✅ Supprimer par ID
    public void deleteById(String id) {
        repo.deleteById(id);
    }

    // ✅ Supprimer plusieurs
    public void deleteMany(List<String> ids) {
        repo.deleteAllById(ids);
    }

    // ✅ Nombre total de ONEP
    public long getTotalCount() {
        return repo.count();
    }

    // ✅ Somme totale des paiements
    public Double getTotalMontantPaiements() {
        return repo.findAll().stream()
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0.0)
                .sum();
    }
}
