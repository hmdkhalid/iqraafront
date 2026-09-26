package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.One;
import com.example.hmdback.dao.repositories.OneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OneService {

    private final OneRepository repo;

    public OneService(OneRepository repo) {
        this.repo = repo;
    }

    // ✅ Récupérer tous les ONE
    public List<One> getAll() {
        return repo.findAll();
    }

    // ✅ Sauvegarder et recalculer le total automatiquement
    public One save(One one) {
        if (one.getPaiements() != null) {
            one.setTotal(one.getPaiements().stream()
                    .mapToDouble(p -> p.getMontant() != null ? p.getMontant() : 0.0)
                    .sum());
        } else {
            one.setTotal(0.0);
        }
        return repo.save(one);
    }

    // ✅ Suppression par ID
    public void deleteById(String id) {
        repo.deleteById(id);
    }

    // ✅ Suppression multiple
    public void deleteMany(List<String> ids) {
        repo.deleteAllById(ids);
    }

    // ✅ Compter le nombre total de comptes ONE
    public long getTotalCount() {
        return repo.count();
    }

    // ✅ Calculer le total des paiements (pour le Dashboard)
    public Double getTotalMontantPaiements() {
        return repo.findAll().stream()
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0.0)
                .sum();
    }
}
