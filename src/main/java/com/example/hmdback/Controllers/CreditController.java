package com.example.hmdback.Controllers;

import com.example.hmdback.Services.CreditService;
import com.example.hmdback.dao.entities.Credit;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credits")
public class CreditController {

    private final CreditService creditService;

    public CreditController(CreditService creditService) {
        this.creditService = creditService;
    }

    @GetMapping
    public List<Credit> getAll() {
        return creditService.getAllCredits();
    }

    @GetMapping("/ecole/{ecole}")
    public List<Credit> getByEcole(@PathVariable String ecole) {
        return creditService.getByEcole(ecole);
    }

    @GetMapping("/personne/{nomPersonne}")
    public List<Credit> getByNomPersonne(@PathVariable String nomPersonne) {
        return creditService.getByNomPersonne(nomPersonne);
    }

    @GetMapping("/annee/{annee}")
    public List<Credit> getByAnnee(@PathVariable Integer annee) {
        return creditService.getByAnnee(annee);
    }

    @GetMapping("/ecole/{ecole}/annee/{annee}")
    public List<Credit> getByEcoleAndAnnee(@PathVariable String ecole, @PathVariable Integer annee) {
        return creditService.getByEcoleAndAnnee(ecole, annee);
    }

    // 🔹 recherche par total
    @GetMapping("/total/{total}")
    public List<Credit> getByTotal(@PathVariable Double total) {
        return creditService.getByTotal(total);
    }

    @PostMapping
    public Credit create(@RequestBody Credit credit) {
        return creditService.save(credit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        creditService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        creditService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPrix() {
        return creditService.getTotalMontant();
    }

    @GetMapping("/total/ecole/{ecole}")
    public Double getTotalPrixParEcole(@PathVariable String ecole) {
        return creditService.getTotalMontantParEcole(ecole);
    }

    @GetMapping("/count")
    public long getTotalCount() {
        return creditService.getTotalCount();
    }

    @PutMapping("/{id}")
    public Credit update(@PathVariable String id, @RequestBody Credit credit) {
        return creditService.update(id, credit);
    }
}
