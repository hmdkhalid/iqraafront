package com.example.hmdback.dao.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "revenus_comptes")
public class RevenuCompte {
    @Id
    private String id;
    private String nomPersonne;
    private double montant;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String ecole; // "Iqraa1" ou "Iqraa2"

    public RevenuCompte() {}

    public RevenuCompte(String id, String nomPersonne, double montant, LocalDate date, String ecole) {
        this.id = id;
        this.nomPersonne = nomPersonne;
        this.montant = montant;
        this.date = date;
        this.ecole = ecole;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getNomPersonne() {
        return nomPersonne;
    }
    public void setNomPersonne(String nomPersonne) {
        this.nomPersonne = nomPersonne;
    }

    public double getMontant() {
        return montant;
    }
    public void setMontant(double montant) {
        this.montant = montant;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getEcole() {
        return ecole;
    }
    public void setEcole(String ecole) {
        this.ecole = ecole;
    }
}
