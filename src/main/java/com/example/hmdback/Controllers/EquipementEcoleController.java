package com.example.hmdback.Controllers;

import com.example.hmdback.Services.EquipementEcoleService;
import com.example.hmdback.dao.entities.EquipementEcole;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipements-ecole")
public class EquipementEcoleController {

    private final EquipementEcoleService equipementEcoleService;

    public EquipementEcoleController(EquipementEcoleService equipementEcoleService) {
        this.equipementEcoleService = equipementEcoleService;
    }

    @GetMapping
    public List<EquipementEcole> getAll() {
        return equipementEcoleService.getAllEquipements();
    }

    @GetMapping("/ecole/{ecole}")
    public List<EquipementEcole> getByEcole(@PathVariable String ecole) {
        return equipementEcoleService.getByEcole(ecole);
    }

    @GetMapping("/nom/{nom}")
    public List<EquipementEcole> getByNom(@PathVariable String nom) {
        return equipementEcoleService.getByNom(nom);
    }

    @PostMapping
    public EquipementEcole create(@RequestBody EquipementEcole equipementEcole) {
        return equipementEcoleService.save(equipementEcole);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        equipementEcoleService.deleteById(id);
    }

    @PostMapping("/deleteMany")
    public void deleteMany(@RequestBody List<String> ids) {
        equipementEcoleService.deleteMany(ids);
    }

    @GetMapping("/total")
    public Double getTotalPrix() {
        return equipementEcoleService.getTotalMontant();
    }

    @GetMapping("/count")
    public long getTotalCount() {
        return equipementEcoleService.getTotalCount();
    }

    @PutMapping("/{id}")
    public EquipementEcole update(@PathVariable String id, @RequestBody EquipementEcole equipementEcole) {
        return equipementEcoleService.update(id, equipementEcole);
    }
}
