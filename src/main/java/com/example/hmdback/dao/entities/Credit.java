// ================== ENTITÉ CREDIT ==================
package com.example.hmdback.dao.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Document(collection = "credits")
public class Credit {

    @Id
    private String id;   // identifiant unique généré par MongoDB

    private String ecole;        // exemple : Iqraa1, Iqraa2
    private String nomPersonne;  // nom de la personne qui a le crédit
    private Double prix;         // montant du crédit
    private Integer annee;       // année du crédit
    private Double total;        // 🔹 champ persistant en DB
}
