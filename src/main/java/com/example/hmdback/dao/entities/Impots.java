package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "impots")  // nom de la collection MongoDB
public class Impots {

    @Id
    private String id;   // identifiant unique généré par MongoDB (String, pas Long)

    private LocalDate date;  // date de l'impôt

    private String type;  // type d'impôt (ex: TVA, IR, IS ...)

    private Double prix;  // montant de l'impôt

    private Double total; // total des impôts (somme de tous les prix)
}
