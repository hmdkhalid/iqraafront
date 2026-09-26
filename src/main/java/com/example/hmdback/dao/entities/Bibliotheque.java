package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "bibliotheques")  // nom de la collection MongoDB
public class Bibliotheque {

    @Id
    private String id;   // identifiant unique généré par MongoDB (String, pas Long)

    private LocalDate date;  // date d'entrée ou publication

    private String type;  // type ou catégorie du livre

    private Double prix;  // prix du livre

    private Double total; // total des prix (peut être calculé)

}
