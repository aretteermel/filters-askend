package org.myapp.datafiltering.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriteriaDto {
    private String type;
    private String comparison;
    private String value;
}
