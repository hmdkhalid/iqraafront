package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Cnss;
import com.example.hmdback.dao.repositories.CnssRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CnssService {

    private final CnssRepository cnssRepository;

    public CnssService(CnssRepository cnssRepository) {
        this.cnssRepository = cnssRepository;
    }
    public Cnss update(String id, Cnss cnss) {
        Cnss existing = cnssRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CNSS non trouvée avec ID: " + id));

        existing.setDate(cnss.getDate());
        existing.setType(cnss.getType());
        existing.setPrix(cnss.getPrix());

        return cnssRepository.save(existing);
    }


    public List<Cnss> getAllCnss() {
        return cnssRepository.findAll();
    }

    public List<Cnss> getByType(String type) {
        return cnssRepository.findByType(type);
    }

    public Cnss save(Cnss cnss) {
        return cnssRepository.save(cnss);
    }

    public void deleteById(String id) {
        cnssRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(cnssRepository::deleteById);
    }

    // ✅ Nombre total
    public long getTotalCount() {
        return cnssRepository.count();
    }

    // ✅ Somme totale des prix
    public Double getTotalMontant() {
        return cnssRepository.findAll()
                .stream()
                .mapToDouble(Cnss::getPrix)
                .sum();
    }
}
