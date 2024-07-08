package org.myapp.datafiltering.controllers;

import org.myapp.datafiltering.dtos.FilterDto;
import org.myapp.datafiltering.services.FilterService;
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
        return filterService.getAllFilterDtos();
    }

    @PostMapping
    public FilterDto createFilter(@RequestBody FilterDto filterDto) {
        return filterService.saveFilter(filterDto);
    }

}
