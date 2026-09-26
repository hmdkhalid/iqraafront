package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "equipements_ecole") // nouvelle collection MongoDB
public class EquipementEcole {

    @Id
    private String id;   // identifiant unique généré par MongoDB

    private String ecole;   // exemple : Iqraa1, Iqraa2
    private String nom;     // nom de l’équipement (projecteur, tableau…)
    private LocalDate date; // date d’achat ou installation
    private Double prix;    // coût de l’équipement

    private Double total;   // total (si besoin de calcul)
}
