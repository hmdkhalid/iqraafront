package com.example.hmdback.Controllers;

import com.example.hmdback.Services.OnepService;
import com.example.hmdback.dao.entities.Onep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/oneps")

public class OnepController {

    private final OnepService service;

    public OnepController(OnepService service) {
        this.service = service;
    }

    @GetMapping
    public List<Onep> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Onep create(@RequestBody Onep onep) {
        return service.save(onep);
    }

    @PutMapping("/{id}")
    public Onep update(@PathVariable String id, @RequestBody Onep onep) {
        onep.setId(id);
        return service.save(onep);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        service.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPaiements() {
        return service.getTotalMontantPaiements();
    }

}
