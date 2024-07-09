package org.myapp.datafiltering.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "types")
@Getter
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

}
