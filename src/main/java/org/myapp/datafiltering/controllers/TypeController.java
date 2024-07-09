package org.myapp.datafiltering.controllers;

import org.myapp.datafiltering.dtos.TypeDto;
import org.myapp.datafiltering.services.TypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/types")
public class TypeController {

    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping
    public List<TypeDto> getAllTypes() {
        return typeService.getAllTypes();
    }
}
