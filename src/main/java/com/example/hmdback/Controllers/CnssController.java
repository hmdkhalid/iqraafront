package com.example.hmdback.Controllers;

import com.example.hmdback.Services.CnssService;
import com.example.hmdback.dao.entities.Cnss;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cnss")

public class CnssController {

    private final CnssService cnssService;

    public CnssController(CnssService cnssService) {
        this.cnssService = cnssService;
    }

    @GetMapping
    public List<Cnss> getAll() {
        return cnssService.getAllCnss();
    }

    @GetMapping("/type/{type}")
    public List<Cnss> getByType(@PathVariable String type) {
        return cnssService.getByType(type);
    }

    @PostMapping
    public Cnss create(@RequestBody Cnss cnss) {
        return cnssService.save(cnss);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        cnssService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        cnssService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPrix() {
        return cnssService.getTotalMontant();
    }
    @PutMapping("/{id}")
    public Cnss update(@PathVariable String id, @RequestBody Cnss cnss) {
        return cnssService.update(id, cnss);
    }

}
