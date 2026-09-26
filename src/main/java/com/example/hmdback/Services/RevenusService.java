package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Revenus;
import com.example.hmdback.dao.repositories.RevenusRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RevenusService {

    private final RevenusRepository revenusRepository;

    public RevenusService(RevenusRepository revenusRepository) {
        this.revenusRepository = revenusRepository;
    }

    public List<Revenus> getAllRevenus() {
        return revenusRepository.findAll();
    }

    public Optional<Revenus> getRevenusById(String id) {
        return revenusRepository.findById(id);
    }

    public Revenus saveRevenus(Revenus revenus) {
        // ✅ Calcul automatique du total incluant le reste de l’année dernière
        double total = 0.0;
        if (revenus.getMontantRevenusBureau() != null) total += revenus.getMontantRevenusBureau();
        if (revenus.getMontantRevenusActivitesParalleles() != null) total += revenus.getMontantRevenusActivitesParalleles();
        if (revenus.getResteAnneeDerniere() != null) total += revenus.getResteAnneeDerniere();

        revenus.setTotalGeneral(total);
        return revenusRepository.save(revenus);
    }

    public void deleteRevenus(String id) {
        revenusRepository.deleteById(id);
    }

    // 🔹 Total global (bureau + activités + reste)
    public Double getTotalRevenusBureauActivitesEtReste() {
        return revenusRepository.findAll().stream()
                .mapToDouble(r ->
                        (r.getMontantRevenusBureau() != null ? r.getMontantRevenusBureau() : 0.0)
                                + (r.getMontantRevenusActivitesParalleles() != null ? r.getMontantRevenusActivitesParalleles() : 0.0)
                                + (r.getResteAnneeDerniere() != null ? r.getResteAnneeDerniere() : 0.0)
                )
                .sum();
    }

    // 🔹 Total uniquement bureau
    public Double getTotalRevenusEspeces() {
        return revenusRepository.findAll().stream()
                .mapToDouble(r -> r.getMontantRevenusBureau() != null ? r.getMontantRevenusBureau() : 0.0)
                .sum();
    }

    // 🔹 Total uniquement activités parallèles
    public Double getTotalRevenusComptes() {
        return revenusRepository.findAll().stream()
                .mapToDouble(r -> r.getMontantRevenusActivitesParalleles() != null ? r.getMontantRevenusActivitesParalleles() : 0.0)
                .sum();
    }

    // 🔹 ✅ Total uniquement "reste de l’année dernière"
    public Double getTotalResteAnneeDerniere() {
        return revenusRepository.findAll().stream()
                .mapToDouble(r -> r.getResteAnneeDerniere() != null ? r.getResteAnneeDerniere() : 0.0)
                .sum();
    }

    // 🔹 Total global (double, même que ci-dessus mais utile pour export général)
    public Double getTotalRevenusGlobal() {
        return revenusRepository.findAll().stream()
                .mapToDouble(r ->
                        (r.getMontantRevenusBureau() != null ? r.getMontantRevenusBureau() : 0.0)
                                + (r.getMontantRevenusActivitesParalleles() != null ? r.getMontantRevenusActivitesParalleles() : 0.0)
                                + (r.getResteAnneeDerniere() != null ? r.getResteAnneeDerniere() : 0.0)
                )
                .sum();
    }
}
