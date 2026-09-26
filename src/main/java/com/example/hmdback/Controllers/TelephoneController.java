package com.example.hmdback.Controllers;

import com.example.hmdback.Services.TelephoneService;
import com.example.hmdback.dao.entities.Telephone;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/telephones")
public class TelephoneController {

    private final TelephoneService service;

    public TelephoneController(TelephoneService service) {
        this.service = service;
    }

    @GetMapping
    public List<Telephone> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Telephone create(@RequestBody Telephone telephone) {
        return service.save(telephone);
    }

    @PutMapping("/{id}")
    public Telephone update(@PathVariable String id, @RequestBody Telephone telephone) {
        telephone.setId(id);
        return service.save(telephone);
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
        return service.getTotalMontantPaiements(); // ✅ corriger ici
    }

}
