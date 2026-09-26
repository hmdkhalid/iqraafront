package com.example.hmdback.Controllers;


import com.example.hmdback.Services.RevenuEspeceService;
import com.example.hmdback.dao.entities.RevenuEspece;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revenus/especes")
public class RevenuEspeceController {
    private final RevenuEspeceService service;

    public RevenuEspeceController(RevenuEspeceService service) {
        this.service = service;
    }
    @PutMapping("/{id}")
    public RevenuEspece update(@PathVariable String id, @RequestBody RevenuEspece revenu) {
        revenu.setId(id); // s’assure que l’ID de l’URL est utilisé
        return service.save(revenu); // save() fait update si id existe
    }

    @GetMapping
    public List<RevenuEspece> getAll() {
        return service.getAll();
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @PostMapping
    public RevenuEspece save(@RequestBody RevenuEspece revenu) {
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
