package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Impots;
import com.example.hmdback.dao.repositories.ImpotsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpotsService {

    private final ImpotsRepository impotsRepository;

    public ImpotsService(ImpotsRepository impotsRepository) {
        this.impotsRepository = impotsRepository;
    }

    public List<Impots> getAllImpots() {
        return impotsRepository.findAll();
    }

    public List<Impots> getByType(String type) {
        return impotsRepository.findByType(type);
    }

    public Impots save(Impots impots) {
        return impotsRepository.save(impots);
    }

    public void deleteById(String id) {
        impotsRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(impotsRepository::deleteById);
    }

    public Double calculerTotalPrix() {
        return impotsRepository.findAll()
                .stream()
                .mapToDouble(Impots::getPrix)
                .sum();
    }
}
