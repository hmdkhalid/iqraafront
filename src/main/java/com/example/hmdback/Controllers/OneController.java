package com.example.hmdback.Controllers;

import com.example.hmdback.Services.OneService;
import com.example.hmdback.dao.entities.One;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ones")

public class OneController {

    private final OneService service;

    public OneController(OneService service) {
        this.service = service;
    }

    @GetMapping
    public List<One> getAll() {
        return service.getAll();
    }

    @PostMapping
    public One create(@RequestBody One one) {
        return service.save(one);
    }

    @PutMapping("/{id}")
    public One update(@PathVariable String id, @RequestBody One one) {
        one.setId(id);
        return service.save(one);
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
