package com.example.hmdback.Controllers;

import com.example.hmdback.Services.AccidentService;
import com.example.hmdback.dao.entities.Accident;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accidents")

public class AccidentController {

    private final AccidentService accidentService;

    public AccidentController(AccidentService accidentService) {
        this.accidentService = accidentService;
    }

    @GetMapping
    public List<Accident> getAll() {
        return accidentService.getAllAccidents();
    }

    @GetMapping("/{id}")
    public Accident getById(@PathVariable String id) {
        return accidentService.getById(id);
    }

    @GetMapping("/type/{type}")
    public List<Accident> getByType(@PathVariable String type) {
        return accidentService.getByType(type);
    }

    @PostMapping
    public Accident create(@RequestBody Accident accident) {
        return accidentService.save(accident);
    }

    @PutMapping("/{id}")
    public Accident update(@PathVariable String id, @RequestBody Accident accident) {
        accident.setId(id);
        return accidentService.save(accident);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        accidentService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        accidentService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalMontant() {
        return accidentService.getTotalMontant();
    }

    @GetMapping("/with-total")
    public Map<String, Object> getAllWithTotal() {
        List<Accident> accidents = accidentService.getAllAccidents();
        Double total = accidentService.getTotalMontant();

        Map<String, Object> response = new HashMap<>();
        response.put("accidents", accidents);
        response.put("total", total);

        return response;
    }



}
