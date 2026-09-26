package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "proprete")
public class Proprete {

    @Id
    private String id;

    private LocalDate date;

    private String type;

    private Double prix;

    private Double total; // somme de tous les prix
}
