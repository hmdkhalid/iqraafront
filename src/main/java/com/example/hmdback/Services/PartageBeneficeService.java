package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.PartageBenefice;
import com.example.hmdback.dao.repositories.PartageBeneficeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartageBeneficeService {

    private final PartageBeneficeRepository partageBeneficeRepository;

    public PartageBeneficeService(PartageBeneficeRepository partageBeneficeRepository) {
        this.partageBeneficeRepository = partageBeneficeRepository;
    }

    public List<PartageBenefice> getAll() {
        return partageBeneficeRepository.findAll();
    }

    public Optional<PartageBenefice> getById(String id) {
        return partageBeneficeRepository.findById(id);
    }

    public PartageBenefice save(PartageBenefice partageBenefice) {
        return partageBeneficeRepository.save(partageBenefice);
    }

    public void delete(String id) {
        partageBeneficeRepository.deleteById(id);
    }

    public double getTotalGeneral() {
        return partageBeneficeRepository.findAll()
                .stream()
                .mapToDouble(PartageBenefice::getMontant)
                .sum();
    }
}
