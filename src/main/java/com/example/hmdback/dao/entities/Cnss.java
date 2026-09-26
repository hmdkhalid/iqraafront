package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "cnss")  // collection MongoDB
public class Cnss {

    @Id
    private String id;     // identifiant unique MongoDB

    private LocalDate date;   // date de paiement ou déclaration

    private String type;   // type de déclaration/paiement CNSS

    private Double prix;   // montant payé

    private Double total;  // somme (optionnelle, peut être calculée)
}
