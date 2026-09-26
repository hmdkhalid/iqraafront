package com.example.hmdback.Controllers;

import com.example.hmdback.Services.PropreteService;
import com.example.hmdback.Services.ReparationService;
import com.example.hmdback.Services.VoitureService;
import com.example.hmdback.dao.entities.Proprete;
import com.example.hmdback.dao.entities.Reparation;
import com.example.hmdback.dao.entities.Voiture;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/reparations")
public class ReparationController {

    private final ReparationService reparationService;
    private final VoitureService voitureService;

    public ReparationController(ReparationService reparationService, VoitureService voitureService) {
        this.reparationService = reparationService;
        this.voitureService = voitureService;
    }

    // 🔹 Toutes les réparations
    @GetMapping
    public List<Reparation> getAll() {
        return reparationService.getAll();
    }

    // 🔹 Réparations par matricule
    @GetMapping("/matricule/{matricule}")
    public List<Reparation> getByMatricule(@PathVariable String matricule) {
        return reparationService.getByMatricule(matricule);
    }

    // 🔹 Créer une réparation
    @PostMapping
    public Reparation create(@RequestBody Reparation r) {
        return reparationService.save(r);
    }

    // 🔹 Modifier une réparation
    @PutMapping("/{id}")
    public Reparation update(@PathVariable String id, @RequestBody Reparation r) {
        r.setId(id);
        return reparationService.save(r);
    }

    // 🔹 Supprimer une réparation
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        reparationService.delete(id);
    }

    // 🔹 Total général
    @GetMapping("/total")
    public double getTotal() {
        return reparationService.getTotalMontant();
    }

    // 🔹 **NOUVEAU** : récupérer tous les matricules des voitures
    @GetMapping("/matricules")
    public List<String> getMatricules() {
        return voitureService.getAllVoitures()  // <-- correction ici
                .stream()
                .map(Voiture::getMatricule)
                .collect(Collectors.toList());
    }

    @RestController
    @RequestMapping("/api/proprete")
    @CrossOrigin(origins = "http://localhost:4200")
    public static class PropreteController {

        private final PropreteService propreteService;

        public PropreteController(PropreteService propreteService) {
            this.propreteService = propreteService;
        }

        @GetMapping
        public List<Proprete> getAll() {
            return propreteService.getAll();
        }

        @GetMapping("/type/{type}")
        public List<Proprete> getByType(@PathVariable String type) {
            return propreteService.getByType(type);
        }

        @PostMapping
        public Proprete create(@RequestBody Proprete proprete) {
            return propreteService.save(proprete);
        }

        @PutMapping("/{id}")
        public Proprete update(@PathVariable String id, @RequestBody Proprete proprete) {
            proprete.setId(id);
            return propreteService.save(proprete);
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable String id) {
            propreteService.deleteById(id);
        }

        @PostMapping("/deleteMany")
        public void deleteMany(@RequestBody List<String> ids) {
            propreteService.deleteMany(ids);
        }

        @GetMapping("/total")
        public Double getTotalPrix() {
            return propreteService.calculerTotalPrix();
        }
    }
}
