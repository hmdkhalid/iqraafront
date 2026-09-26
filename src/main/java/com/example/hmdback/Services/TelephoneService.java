package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Telephone;
import com.example.hmdback.dao.repositories.TelephoneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TelephoneService {

    private final TelephoneRepository repo;

    public TelephoneService(TelephoneRepository repo) {
        this.repo = repo;
    }

    public List<Telephone> getAll() {
        return repo.findAll();
    }

    public Telephone save(Telephone t) {
        if (t.getPaiements() != null) {
            t.setTotal(t.getPaiements().stream()
                    .mapToDouble(p -> p.getMontant() != null ? p.getMontant() : 0.0)
                    .sum());
        } else {
            t.setTotal(0.0);
        }
        return repo.save(t);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        repo.deleteAllById(ids);
    }

    // 🔹 Standardisé pour Dashboard
    public long getTotalCount() {
        return repo.count();
    }

    public Double getTotalMontantPaiements() {
        return repo.findAll().stream()
                .mapToDouble(t -> t.getTotal() != null ? t.getTotal() : 0.0)
                .sum();
    }
}
