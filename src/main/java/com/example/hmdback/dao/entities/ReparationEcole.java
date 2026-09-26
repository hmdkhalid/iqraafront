package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "reparations_ecole") // nouvelle collection MongoDB
public class ReparationEcole {

    @Id
    private String id;   // identifiant unique généré par MongoDB

    private LocalDate date;  // date de la réparation

    private String type;     // type de réparation

    private Double prix;     // coût de la réparation

    private Double total;    // total (peut être calculé)
}
