package com.example.hmdback.Controllers;

import com.example.hmdback.Services.PressonService;
import com.example.hmdback.dao.entities.Presson;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pressons")

public class PressonController {

    private final PressonService pressonService;

    public PressonController(PressonService pressonService) {
        this.pressonService = pressonService;
    }

    // 🔹 Récupérer tous les pressons
    @GetMapping
    public List<Presson> getAll() {
        return pressonService.getAll();
    }

    // 🔹 Créer un presson
    @PostMapping
    public Presson create(@RequestBody Presson presson) {
        return pressonService.save(presson);
    }

    // 🔹 Supprimer un presson par ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        pressonService.deleteById(id);
    }

    // 🔹 Supprimer plusieurs pressons en une seule requête
    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        pressonService.deleteMany(ids);
    }

    // 🔹 Calculer le total de tous les paiements
    @GetMapping("/total")
    public Double getTotalPaiements() {
        return pressonService.calculerTotalPaiements();
    }
    // 🔹 Modifier un presson par ID
    @PutMapping("/{id}")
    public Presson update(@PathVariable String id, @RequestBody Presson presson) {
        // on s'assure que l'ID correspond
        presson.setId(id);
        return pressonService.save(presson);
    }

}
