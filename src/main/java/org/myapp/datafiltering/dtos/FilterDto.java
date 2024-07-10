package org.myapp.datafiltering.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FilterDto {

    private Long id;

    @NotNull
    @NotBlank
    private String name;

    @Valid
    @NotNull
    @NotEmpty
    private List<CriteriaDto> criteria;
}
