package com.example.hmdback.dao.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "revenus")
public class Revenus {

    @Id
    private String id;

    private Double montantRevenusBureau;
    private Double montantRevenusActivitesParalleles;
    private Double totalGeneral;

    // 🆕 Nouvel attribut : reste de l’année dernière
    private Double resteAnneeDerniere;

    // Constructeur personnalisé
    public Revenus(Double montantRevenusBureau, Double montantRevenusActivitesParalleles, Double resteAnneeDerniere) {
        this.montantRevenusBureau = montantRevenusBureau;
        this.montantRevenusActivitesParalleles = montantRevenusActivitesParalleles;
        this.resteAnneeDerniere = resteAnneeDerniere;
        this.totalGeneral = calculerTotal();
    }

    // 🔹 Mise à jour auto du total
    public void setMontantRevenusBureau(Double montantRevenusBureau) {
        this.montantRevenusBureau = montantRevenusBureau;
        this.totalGeneral = calculerTotal();
    }

    public void setMontantRevenusActivitesParalleles(Double montantRevenusActivitesParalleles) {
        this.montantRevenusActivitesParalleles = montantRevenusActivitesParalleles;
        this.totalGeneral = calculerTotal();
    }

    public void setResteAnneeDerniere(Double resteAnneeDerniere) {
        this.resteAnneeDerniere = resteAnneeDerniere;
        this.totalGeneral = calculerTotal();
    }

    private Double calculerTotal() {
        return (montantRevenusBureau != null ? montantRevenusBureau : 0.0)
                + (montantRevenusActivitesParalleles != null ? montantRevenusActivitesParalleles : 0.0)
                + (resteAnneeDerniere != null ? resteAnneeDerniere : 0.0);
    }
}
