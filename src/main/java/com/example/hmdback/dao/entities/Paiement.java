package com.example.hmdback.dao.entities;

import java.time.LocalDate;

public class Paiement {
    private String mois;
    private Double montant;
    private LocalDate datePaiement;

    // --- Getters & Setters ---
    public String getMois() {
        return mois;
    }

    public void setMois(String mois) {
        this.mois = mois;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public LocalDate getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
    }
}
