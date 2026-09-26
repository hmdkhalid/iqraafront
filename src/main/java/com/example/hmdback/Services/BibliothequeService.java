package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Bibliotheque;
import com.example.hmdback.dao.repositories.BibliothequeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BibliothequeService {

    private final BibliothequeRepository bibliothequeRepository;

    public BibliothequeService(BibliothequeRepository bibliothequeRepository) {
        this.bibliothequeRepository = bibliothequeRepository;
    }

    public List<Bibliotheque> getAllBibliotheques() {
        return bibliothequeRepository.findAll();
    }

    public List<Bibliotheque> getByType(String type) {
        return bibliothequeRepository.findByType(type);
    }

    public Bibliotheque save(Bibliotheque bibliotheque) {
        return bibliothequeRepository.save(bibliotheque);
    }

    public void deleteById(String id) {
        bibliothequeRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(bibliothequeRepository::deleteById);
    }

    // ✅ Nombre total
    public long getTotalCount() {
        return bibliothequeRepository.count();
    }

    // ✅ Somme totale des prix
    public Double getTotalMontant() {
        return bibliothequeRepository.findAll()
                .stream()
                .mapToDouble(Bibliotheque::getPrix)
                .sum();
    }
}
