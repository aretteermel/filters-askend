package org.myapp.datafiltering.controllers;

import org.myapp.datafiltering.dtos.ComparisonDto;
import org.myapp.datafiltering.services.ComparisonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comparisons")
public class ComparisonController {

    private final ComparisonService comparisonService;

    public ComparisonController(ComparisonService comparisonService) {
        this.comparisonService = comparisonService;
    }

    @GetMapping
    public List<ComparisonDto> getAllComparisons() {
        return comparisonService.getAllComparisons();
    }

}
