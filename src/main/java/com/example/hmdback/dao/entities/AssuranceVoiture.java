package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "assurances_voitures")
public class AssuranceVoiture {

    @Id
    private String id;  // identifiant généré par MongoDB

    private String matricule;       // matricule de la voiture (clé de liaison avec Voiture)
    private Double prixAssurance;   // prix de l’assurance
    private Double prixVisite;      // prix de la visite technique
    private Double totalAssurance;  // total cumulé des assurances pour cette voiture
    private Double totalVisite;     // total cumulé des visites pour cette voiture
}
