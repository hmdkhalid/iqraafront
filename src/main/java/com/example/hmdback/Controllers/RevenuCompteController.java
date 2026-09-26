package com.example.hmdback.Controllers;


import com.example.hmdback.Services.RevenuCompteService;
import com.example.hmdback.dao.entities.RevenuCompte;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revenus/comptes")
public class RevenuCompteController {
    private final RevenuCompteService service;

    public RevenuCompteController(RevenuCompteService service) {
        this.service = service;
    }

    @GetMapping
    public List<RevenuCompte> getAll() {
        return service.getAll();
    }
    @PutMapping("/{id}")
    public RevenuCompte update(@PathVariable String id, @RequestBody RevenuCompte revenu) {
        revenu.setId(id);
        return service.save(revenu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build(); // ✅ 204 No Content
    }


    @PostMapping
    public RevenuCompte save(@RequestBody RevenuCompte revenu) {
        return service.save(revenu);
    }

    @GetMapping("/total/{ecole}")
    public double getTotalParEcole(@PathVariable String ecole) {
        return service.getTotalParEcole(ecole);
    }

    @GetMapping("/total")
    public double getTotalGeneral() {
        return service.getTotalGeneral();
    }
}
