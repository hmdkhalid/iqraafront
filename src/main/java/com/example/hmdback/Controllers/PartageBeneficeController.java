package com.example.hmdback.Controllers;

import com.example.hmdback.Services.PartageBeneficeService;
import com.example.hmdback.dao.entities.PartageBenefice;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partage-benefices")
@CrossOrigin(origins = "*")
public class PartageBeneficeController {

    private final PartageBeneficeService partageBeneficeService;

    public PartageBeneficeController(PartageBeneficeService partageBeneficeService) {
        this.partageBeneficeService = partageBeneficeService;
    }

    @GetMapping
    public List<PartageBenefice> getAll() {
        return partageBeneficeService.getAll();
    }

    @GetMapping("/total")
    public double getTotalGeneral() {
        return partageBeneficeService.getTotalGeneral();
    }

    @GetMapping("/{id}")
    public PartageBenefice getById(@PathVariable String id) {
        return partageBeneficeService.getById(id).orElse(null);
    }

    @PostMapping
    public PartageBenefice create(@RequestBody PartageBenefice partageBenefice) {
        return partageBeneficeService.save(partageBenefice);
    }

    @PutMapping("/{id}")
    public PartageBenefice update(@PathVariable String id, @RequestBody PartageBenefice partageBenefice) {
        partageBenefice.setId(id);
        return partageBeneficeService.save(partageBenefice);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        partageBeneficeService.delete(id);
    }
}
