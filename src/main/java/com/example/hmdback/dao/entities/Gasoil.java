package com.example.hmdback.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "gasoils")
public class Gasoil {

    @Id
    private String id;

    @DBRef
    private Voiture voiture;    // relation avec Voiture

    private Double total;
    private List<Paiement> paiements;

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Voiture getVoiture() { return voiture; }
    public void setVoiture(Voiture voiture) { this.voiture = voiture; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public List<Paiement> getPaiements() { return paiements; }
    public void setPaiements(List<Paiement> paiements) { this.paiements = paiements; }

}
