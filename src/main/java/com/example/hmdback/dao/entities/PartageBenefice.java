package com.example.hmdback.dao.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "partage_benefices")
public class PartageBenefice {

    @Id
    private String id;

    private Double montant;

    private Date datePartage; // ✅ nouvelle propriété
}
