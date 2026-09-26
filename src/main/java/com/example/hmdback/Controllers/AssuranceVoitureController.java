package com.example.hmdback.Controllers;

import com.example.hmdback.Services.AssuranceVoitureService;
import com.example.hmdback.dao.entities.AssuranceVoiture;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assurances-voitures")

public class AssuranceVoitureController {

    private final AssuranceVoitureService service;

    public AssuranceVoitureController(AssuranceVoitureService service) {
        this.service = service;
    }

    @GetMapping
    public List<AssuranceVoiture> getAll() {
        return service.getAll();
    }

    @GetMapping("/matricule/{matricule}")
    public List<AssuranceVoiture> getByMatricule(@PathVariable String matricule) {
        return service.getByMatricule(matricule);
    }

    @PostMapping
    public AssuranceVoiture create(@RequestBody AssuranceVoiture assurance) {
        return service.save(assurance);
    }

    @PutMapping("/{id}")
    public AssuranceVoiture update(@PathVariable String id, @RequestBody AssuranceVoiture assurance) {
        return service.update(id, assurance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        service.deleteMany(ids);
    }

    @GetMapping("/total/assurance")
    public Double getTotalAssurance() {
        return service.getTotalAssurance();
    }

    @GetMapping("/total/visite")
    public Double getTotalVisite() {
        return service.getTotalVisite();
    }
}
