package com.example.hmdback.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "revenus_especes")
public class RevenuEspece {
    @Id
    private String id;
    private double montant;
    private String ecole; // "Iqraa1" ou "Iqraa2"

    public RevenuEspece() {}

    public RevenuEspece(String id, double montant, String ecole) {
        this.id = id;
        this.montant = montant;
        this.ecole = ecole;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public double getMontant() {
        return montant;
    }
    public void setMontant(double montant) {
        this.montant = montant;
    }

    public String getEcole() {
        return ecole;
    }
    public void setEcole(String ecole) {
        this.ecole = ecole;
    }
}
