package com.example.hmdback.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "voitures") // Nom de la collection MongoDB
public class Voiture {

    @Id
    private String id;      // identifiant généré par MongoDB

    private String matricule; // numéro de matricule de la voiture

    // Constructeurs
    public Voiture() {}

    public Voiture(String matricule) {
        this.matricule = matricule;
    }

    // Getters et Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    @Override
    public String toString() {
        return "Voiture{" +
                "id='" + id + '\'' +
                ", matricule='" + matricule + '\'' +
                '}';
    }
}
