package com.example.hmdback.Controllers;

import com.example.hmdback.Services.RevenusService;
import com.example.hmdback.dao.entities.Revenus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revenus")
@CrossOrigin(origins = "*")
public class RevenusController {

    private final RevenusService revenusService;

    public RevenusController(RevenusService revenusService) {
        this.revenusService = revenusService;
    }

    @GetMapping
    public List<Revenus> getAllRevenus() {
        return revenusService.getAllRevenus();
    }

    @GetMapping("/{id}")
    public Revenus getRevenusById(@PathVariable String id) {
        return revenusService.getRevenusById(id).orElse(null);
    }

    @PostMapping
    public Revenus createRevenus(@RequestBody Revenus revenus) {
        return revenusService.saveRevenus(revenus);
    }

    @PutMapping("/{id}")
    public Revenus updateRevenus(@PathVariable String id, @RequestBody Revenus revenus) {
        revenus.setId(id);
        return revenusService.saveRevenus(revenus);
    }

    @DeleteMapping("/{id}")
    public void deleteRevenus(@PathVariable String id) {
        revenusService.deleteRevenus(id);
    }

    // ✅ Total global (bureau + activités parallèles + reste)
    @GetMapping("/total")
    public Double getTotalRevenus() {
        return revenusService.getTotalRevenusBureauActivitesEtReste();
    }

    // ✅ Total du "reste de l’année dernière" uniquement
    @GetMapping("/reste/total")
    public Double getTotalResteAnneeDerniere() {
        return revenusService.getTotalResteAnneeDerniere();
    }


}
