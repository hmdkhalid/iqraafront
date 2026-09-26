package com.example.hmdback.Controllers;

import com.example.hmdback.Services.ImpotsService;
import com.example.hmdback.dao.entities.Impots;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/impots")
public class ImpotsController {

    private final ImpotsService impotsService;

    public ImpotsController(ImpotsService impotsService) {
        this.impotsService = impotsService;
    }

    @GetMapping
    public List<Impots> getAll() {
        return impotsService.getAllImpots();
    }

    @GetMapping("/type/{type}")
    public List<Impots> getByType(@PathVariable String type) {
        return impotsService.getByType(type);
    }

    @PostMapping
    public Impots create(@RequestBody Impots impots) {
        return impotsService.save(impots);
    }

    @PutMapping("/{id}")
    public Impots update(@PathVariable String id, @RequestBody Impots impots) {
        impots.setId(id);
        return impotsService.save(impots);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        impotsService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        impotsService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPrix() {
        return impotsService.calculerTotalPrix();
    }
}
