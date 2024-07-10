package org.myapp.datafiltering.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriteriaDto {

    @NotNull
    @NotBlank
    private String type;

    @NotNull
    @NotBlank
    private String comparison;

    @NotNull
    @NotBlank
    private String value;

}
