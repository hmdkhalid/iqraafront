package com.example.hmdback.Controllers;

import com.example.hmdback.Services.VoitureService;
import com.example.hmdback.dao.entities.Voiture;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/voitures")
@CrossOrigin(origins = "*")
public class VoitureController {

    private final VoitureService voitureService;

    public VoitureController(VoitureService voitureService) {
        this.voitureService = voitureService;
    }

    // Lister toutes les voitures
    @GetMapping
    public List<Voiture> getAll() {
        return voitureService.getAllVoitures();
    }

    // Endpoint pour récupérer seulement les matricules
    @GetMapping("/matricules")
    public List<String> getMatricules() {
        return voitureService.getAllVoitures()
                .stream()
                .map(Voiture::getMatricule)
                .toList();
    }

    @PostMapping
    public Voiture create(@RequestBody Voiture voiture) {
        return voitureService.save(voiture);
    }

    @PutMapping("/{id}")
    public Voiture update(@PathVariable String id, @RequestBody Voiture voiture) {
        return voitureService.update(id, voiture);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        voitureService.delete(id);
    }
}
