package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.Accident;
import com.example.hmdback.dao.repositories.AccidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccidentService {

    private final AccidentRepository accidentRepository;

    public AccidentService(AccidentRepository accidentRepository) {
        this.accidentRepository = accidentRepository;
    }

    public List<Accident> getAllAccidents() {
        return accidentRepository.findAll();
    }

    public Accident getById(String id) {
        return accidentRepository.findById(id).orElse(null);
    }

    public List<Accident> getByType(String type) {
        return accidentRepository.findByType(type);
    }

    public Accident save(Accident accident) {
        return accidentRepository.save(accident);
    }

    public void deleteById(String id) {
        accidentRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(accidentRepository::deleteById);
    }

    public Double getTotalMontant() {
        return accidentRepository.findAll().stream()
                .mapToDouble(a -> a.getMontant() != null ? a.getMontant() : 0)
                .sum();
    }
}
