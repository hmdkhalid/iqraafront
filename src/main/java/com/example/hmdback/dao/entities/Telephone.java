package com.example.hmdback.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "telephones")
public class Telephone {
    @Id
    private String id;

    private String numero;
    private Double total;
    private List<Paiement> paiements;

    // --- Getters & Setters ---
    public String getId() {
        return id;
    }

    public void setId(String id) {  // ✅ corrige setId
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
    }
}
