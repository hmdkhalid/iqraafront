package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Credit;
import com.example.hmdback.dao.repositories.CreditRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditService {

    private final CreditRepository creditRepository;

    public CreditService(CreditRepository creditRepository) {
        this.creditRepository = creditRepository;
    }

    public List<Credit> getAllCredits() {
        return creditRepository.findAll();
    }

    public List<Credit> getByEcole(String ecole) {
        return creditRepository.findByEcole(ecole);
    }

    public List<Credit> getByNomPersonne(String nomPersonne) {
        return creditRepository.findByNomPersonne(nomPersonne);
    }

    public List<Credit> getByAnnee(Integer annee) {
        return creditRepository.findByAnnee(annee);
    }

    public List<Credit> getByEcoleAndAnnee(String ecole, Integer annee) {
        return creditRepository.findByEcoleAndAnnee(ecole, annee);
    }

    public List<Credit> getByTotal(Double total) {
        return creditRepository.findByTotal(total);
    }

    public Credit save(Credit credit) {
        return creditRepository.save(credit);
    }

    public void deleteById(String id) {
        creditRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(creditRepository::deleteById);
    }

    public long getTotalCount() {
        return creditRepository.count();
    }

    public Double getTotalMontant() {
        return creditRepository.findAll()
                .stream()
                .mapToDouble(Credit::getPrix)
                .sum();
    }

    public Double getTotalMontantParEcole(String ecole) {
        return creditRepository.findByEcole(ecole)
                .stream()
                .mapToDouble(Credit::getPrix)
                .sum();
    }

    public Credit update(String id, Credit credit) {
        Credit existing = creditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crédit introuvable avec id " + id));

        existing.setEcole(credit.getEcole());
        existing.setNomPersonne(credit.getNomPersonne());
        existing.setPrix(credit.getPrix());
        existing.setAnnee(credit.getAnnee());
        existing.setTotal(credit.getTotal()); // 🔹 maj du champ total

        return creditRepository.save(existing);
    }
}
