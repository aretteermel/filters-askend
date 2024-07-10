package org.myapp.datafiltering.controllers;

import jakarta.validation.Valid;
import org.myapp.datafiltering.dtos.FilterDto;
import org.myapp.datafiltering.services.FilterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filters")
public class FilterController {

    private final FilterService filterService;

    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping
    public List<FilterDto> getAllFilters() {
        return filterService.getAllFilters();
    }

    @PostMapping
    public ResponseEntity <?> createFilter(@Valid @RequestBody FilterDto filterDto) {
        try{
            FilterDto filter = filterService.saveFilter(filterDto);
            return ResponseEntity.ok(filter);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
