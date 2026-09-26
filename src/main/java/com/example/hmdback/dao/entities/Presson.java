package com.example.hmdback.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "pressons")
public class Presson {
    @Id
    private String id;

    private String nomComplet;
    private List<Paiement> paiements;

    // --- Getters & Setters ---
    public String getId() {
        return id;
    }

    public void setId(String id) {   // ✅ corrige l'erreur setId
        this.id = id;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
    }
}
