package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "accidents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accident {
    @Id
    private String id;
    private String nomPersonne;
    private String type;   // "professeur", "etudiant", etc.
    private LocalDate date;
    private Double montant;
}
