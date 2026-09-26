package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Proprete;
import com.example.hmdback.dao.repositories.PropreteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropreteService {

    private final PropreteRepository propreteRepository;

    public PropreteService(PropreteRepository propreteRepository) {
        this.propreteRepository = propreteRepository;
    }

    public List<Proprete> getAll() {
        return propreteRepository.findAll();
    }

    public List<Proprete> getByType(String type) {
        return propreteRepository.findByType(type);
    }

    public Proprete save(Proprete p) {
        return propreteRepository.save(p);
    }

    public void deleteById(String id) {
        propreteRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(propreteRepository::deleteById);
    }

    public Double calculerTotalPrix() {
        return propreteRepository.findAll()
                .stream()
                .mapToDouble(Proprete::getPrix)
                .sum();
    }
}
