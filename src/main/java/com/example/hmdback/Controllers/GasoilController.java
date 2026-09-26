package com.example.hmdback.Controllers;

import com.example.hmdback.Services.GasoilService;
import com.example.hmdback.dao.entities.Gasoil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gasoils")
public class GasoilController {

    private final GasoilService gasoilService;

    public GasoilController(GasoilService gasoilService) {
        this.gasoilService = gasoilService;
    }

    // ✅ Ajouter un gasoil pour une voiture
    @PostMapping("/{voitureId}")
    public Gasoil create(@PathVariable String voitureId, @RequestBody Gasoil gasoil) {
        return gasoilService.create(voitureId, gasoil);
    }

    // ✅ Récupérer tous les gasoils
    @GetMapping
    public List<Gasoil> getAll() {
        return gasoilService.getAll();
    }

    // ✅ Récupérer un gasoil par ID
    @GetMapping("/{id}")
    public Gasoil getById(@PathVariable String id) {
        return gasoilService.getById(id).orElse(null);
    }

    // ✅ Récupérer tous les gasoils d’une voiture
    @GetMapping("/voiture/{voitureId}")
    public List<Gasoil> getByVoiture(@PathVariable String voitureId) {
        return gasoilService.getByVoiture(voitureId);
    }

    // ✅ Supprimer un gasoil
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        gasoilService.delete(id);
    }

    @PutMapping("/{id}/{voitureId}")
    public Gasoil update(@PathVariable String id, @PathVariable String voitureId, @RequestBody Gasoil gasoil) {
        return gasoilService.update(id, voitureId, gasoil);
    }
    @GetMapping("/total")
    public Double getTotal() {
        return gasoilService.getTotalMontant();
    }


}
