package com.example.hmdback.Controllers;

import com.example.hmdback.Services.AssuranceService;
import com.example.hmdback.dao.entities.Assurance;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assurances")
@CrossOrigin(origins = "http://localhost:4200")
public class AssuranceController {

    private final AssuranceService assuranceService;

    public AssuranceController(AssuranceService assuranceService) {
        this.assuranceService = assuranceService;
    }

    @GetMapping
    public List<Assurance> getAll() {
        return assuranceService.getAllAssurances();
    }

    @GetMapping("/type/{type}")
    public List<Assurance> getByType(@PathVariable String type) {
        return assuranceService.getByType(type);
    }

    @PostMapping
    public Assurance create(@RequestBody Assurance assurance) {
        return assuranceService.save(assurance);
    }

    @PutMapping("/{id}")
    public Assurance update(@PathVariable String id, @RequestBody Assurance assurance) {
        assurance.setId(id);
        return assuranceService.save(assurance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        assuranceService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        assuranceService.deleteMany(ids);
    }
    @GetMapping("/total")
    public Double getTotalPrix() {
        return assuranceService.getTotalMontantPaiements();
    }



}
