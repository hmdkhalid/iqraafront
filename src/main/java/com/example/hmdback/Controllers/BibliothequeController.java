package com.example.hmdback.Controllers;

import com.example.hmdback.Services.BibliothequeService;
import com.example.hmdback.dao.entities.Bibliotheque;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// ... imports inchangés
@RestController
@RequestMapping("/api/bibliotheques")

public class BibliothequeController {

    private final BibliothequeService bibliothequeService;

    public BibliothequeController(BibliothequeService bibliothequeService) {
        this.bibliothequeService = bibliothequeService;
    }

    @GetMapping
    public List<Bibliotheque> getAll() {
        return bibliothequeService.getAllBibliotheques();
    }

    @GetMapping("/type/{type}")
    public List<Bibliotheque> getByType(@PathVariable String type) {
        return bibliothequeService.getByType(type);
    }

    @PostMapping
    public Bibliotheque create(@RequestBody Bibliotheque bibliotheque) {
        return bibliothequeService.save(bibliotheque);
    }

    // 🔹 suppression par ID String
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        bibliothequeService.deleteById(id);
    }

    // 🔹 suppression multiple par liste de String
    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        bibliothequeService.deleteMany(ids);
    }
    @PutMapping("/{id}")
    public Bibliotheque update(@PathVariable String id, @RequestBody Bibliotheque bibliotheque) {
        bibliotheque.setId(id);
        return bibliothequeService.save(bibliotheque);
    }


    @GetMapping("/total")
    public Double getTotalPrix() {
        return bibliothequeService.getTotalMontant();
    }

}