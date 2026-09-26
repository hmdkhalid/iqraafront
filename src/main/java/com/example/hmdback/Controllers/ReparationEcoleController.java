package com.example.hmdback.Controllers;

import com.example.hmdback.Services.ReparationEcoleService;
import com.example.hmdback.dao.entities.ReparationEcole;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reparations-ecole")

public class ReparationEcoleController {

    private final ReparationEcoleService reparationEcoleService;

    public ReparationEcoleController(ReparationEcoleService reparationEcoleService) {
        this.reparationEcoleService = reparationEcoleService;
    }

    @GetMapping
    public List<ReparationEcole> getAll() {
        return reparationEcoleService.getAllReparations();
    }

    @GetMapping("/type/{type}")
    public List<ReparationEcole> getByType(@PathVariable String type) {
        return reparationEcoleService.getByType(type);
    }

    @PostMapping
    public ReparationEcole create(@RequestBody ReparationEcole reparationEcole) {
        return reparationEcoleService.save(reparationEcole);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        reparationEcoleService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        reparationEcoleService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPrix() {
        return reparationEcoleService.getTotalMontant();
    }

    @GetMapping("/count")
    public long getTotalCount() {
        return reparationEcoleService.getTotalCount();
    }

    @PutMapping("/{id}")
    public ReparationEcole update(@PathVariable String id, @RequestBody ReparationEcole reparationEcole) {
        return reparationEcoleService.update(id, reparationEcole);
    }

}
