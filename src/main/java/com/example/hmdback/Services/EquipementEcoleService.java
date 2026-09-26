package com.example.hmdback.Services;

import com.example.hmdback.dao.entities.EquipementEcole;
import com.example.hmdback.dao.repositories.EquipementEcoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipementEcoleService {

    private final EquipementEcoleRepository equipementEcoleRepository;

    public EquipementEcoleService(EquipementEcoleRepository equipementEcoleRepository) {
        this.equipementEcoleRepository = equipementEcoleRepository;
    }

    public List<EquipementEcole> getAllEquipements() {
        return equipementEcoleRepository.findAll();
    }

    public List<EquipementEcole> getByEcole(String ecole) {
        return equipementEcoleRepository.findByEcole(ecole);
    }

    public List<EquipementEcole> getByNom(String nom) {
        return equipementEcoleRepository.findByNom(nom);
    }

    public EquipementEcole save(EquipementEcole equipementEcole) {
        return equipementEcoleRepository.save(equipementEcole);
    }

    public void deleteById(String id) {
        equipementEcoleRepository.deleteById(id);
    }

    public void deleteMany(List<String> ids) {
        ids.forEach(equipementEcoleRepository::deleteById);
    }

    public long getTotalCount() {
        return equipementEcoleRepository.count();
    }

    public Double getTotalMontant() {
        return equipementEcoleRepository.findAll()
                .stream()
                .mapToDouble(EquipementEcole::getPrix)
                .sum();
    }

    public EquipementEcole update(String id, EquipementEcole equipementEcole) {
        EquipementEcole existing = equipementEcoleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Équipement introuvable avec id " + id));

        existing.setEcole(equipementEcole.getEcole());
        existing.setNom(equipementEcole.getNom());
        existing.setDate(equipementEcole.getDate());
        existing.setPrix(equipementEcole.getPrix());

        return equipementEcoleRepository.save(existing);
    }
}
