package org.myapp.datafiltering.services;

import org.myapp.datafiltering.dtos.ComparisonDto;
import org.myapp.datafiltering.models.Comparison;
import org.myapp.datafiltering.repositories.ComparisonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComparisonService {

    private final ComparisonRepository comparisonRepository;

    public ComparisonService(ComparisonRepository comparisonRepository) {
        this.comparisonRepository = comparisonRepository;
    }

    public List<ComparisonDto> getAllComparisons() {
        List<Comparison> comparisons = comparisonRepository.findAll();
        return comparisons.stream()
                .map(this::getComparison)
                .collect(Collectors.toList());
    }

    private ComparisonDto getComparison(Comparison comparison) {
        ComparisonDto comparisonDto = new ComparisonDto();
        comparisonDto.setTypeId(comparison.getType().getId());
        comparisonDto.setComparison(comparison.getComparison());
        return comparisonDto;
    }

}
