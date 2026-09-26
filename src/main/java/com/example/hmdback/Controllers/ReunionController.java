package com.example.hmdback.Controllers;

import com.example.hmdback.Services.ReunionService;
import com.example.hmdback.dao.entities.Reunion;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reunions")

public class ReunionController {

    private final ReunionService reunionService;

    public ReunionController(ReunionService reunionService) {
        this.reunionService = reunionService;
    }

    @GetMapping
    public List<Reunion> getAll() {
        return reunionService.getAllReunions();
    }

    @GetMapping("/type/{type}")
    public List<Reunion> getByType(@PathVariable String type) {
        return reunionService.getByType(type);
    }

    @PostMapping
    public Reunion create(@RequestBody Reunion reunion) {
        return reunionService.save(reunion);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        reunionService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        reunionService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalMontant() {
        return reunionService.getTotalMontant();
    }
    @GetMapping("/with-total")
    public Map<String, Object> getAllWithTotal() {
        List<Reunion> reunions = reunionService.getAllReunions();
        Double total = reunionService.getTotalMontant();

        Map<String, Object> response = new HashMap<>();
        response.put("reunions", reunions);
        response.put("total", total);

        return response;
    }
    @PutMapping("/{id}")
    public Reunion update(@PathVariable String id, @RequestBody Reunion reunion) {
        reunion.setId(id);
        return reunionService.save(reunion);
    }


}
