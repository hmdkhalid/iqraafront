package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "reunions") // nom de la collection MongoDB
public class Reunion {

    @Id
    private String id;   // identifiant unique MongoDB

    private String type; // type de réunion (AG, Comité, etc.)

    private LocalDate date; // date de la réunion

    private Double montant; // montant associé à la réunion

    private Double total; // total (sera rempli depuis le service)
}
