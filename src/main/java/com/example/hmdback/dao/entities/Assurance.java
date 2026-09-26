package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "assurances")
public class Assurance {

    @Id
    private String id;

    private LocalDate date;

    private String type;

    private Double prix;

    private Double total; // somme des prix de toutes les assurances
}
