package org.myapp.datafiltering.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "criterias")
@Getter
@Setter
public class Criteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "filter_id", nullable = false)
    private Filter filter;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "comparison_id", nullable = false)
    private Comparison comparison;

    @Column(name = "criteria_value", nullable = false)
    private String value;

}
