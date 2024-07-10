package org.myapp.datafiltering.services;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.myapp.datafiltering.dtos.CriteriaDto;
import org.myapp.datafiltering.dtos.FilterDto;
import org.myapp.datafiltering.models.Comparison;
import org.myapp.datafiltering.models.Criteria;
import org.myapp.datafiltering.models.Filter;
import org.myapp.datafiltering.models.Type;
import org.myapp.datafiltering.repositories.ComparisonRepository;
import org.myapp.datafiltering.repositories.FilterRepository;
import org.myapp.datafiltering.repositories.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final TypeRepository typeRepository;
    private final ComparisonRepository comparisonRepository;

    private final Map<String, List<String>> allowedComparisons = Map.of(
            "Amount", Arrays.asList("Equal", "Not equal", "Greater than", "Less than", "More than or equal", "Less than or equal"),
            "Title", Arrays.asList("Starts with", "Ends with", "Contains"),
            "Date", Arrays.asList("From", "To", "On")
    );

    public FilterService(FilterRepository filterRepository, TypeRepository typeRepository, ComparisonRepository comparisonRepository) {
        this.filterRepository = filterRepository;
        this.typeRepository = typeRepository;
        this.comparisonRepository = comparisonRepository;
    }

    public List<FilterDto> getAllFilters() {
        List<Filter> filters = filterRepository.findAll();
        return filters.stream()
                .map(this::convertToFilterDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public FilterDto saveFilter(@Valid FilterDto filterDto) {
        Filter filter = new Filter();
        filter.setName(filterDto.getName());

            List<Criteria> criteriaList = filterDto.getCriteria().stream()
                    .map(criteriaDto -> convertToCriteria(criteriaDto, filter))
                    .collect(Collectors.toList());
            filter.setCriteria(criteriaList);


        Filter savedFilter = filterRepository.save(filter);
        return convertToFilterDto(savedFilter);
    }

    private FilterDto convertToFilterDto(Filter filter) {
        FilterDto filterDto = new FilterDto();
        filterDto.setId(filter.getId());
        filterDto.setName(filter.getName());
        List<CriteriaDto> criteriaDtos = filter.getCriteria().stream()
                .map(this::convertToCriteriaDto)
                .collect(Collectors.toList());
        filterDto.setCriteria(criteriaDtos);
        return filterDto;
    }

    private CriteriaDto convertToCriteriaDto(Criteria criteria) {
        CriteriaDto criteriaDto = new CriteriaDto();
        criteriaDto.setType(criteria.getType().getType());
        criteriaDto.setComparison(criteria.getComparison().getComparison());
        criteriaDto.setValue(criteria.getValue());
        return criteriaDto;
    }

    private Criteria convertToCriteria(CriteriaDto criteriaDto, Filter filter) {
        Criteria criteria = new Criteria();
        criteria.setFilter(filter);

        Type type = typeRepository.findByType(criteriaDto.getType());
        if (type == null) {
            throw new IllegalArgumentException("Invalid type: " + criteriaDto.getType());
        }
        criteria.setType(type);

        Comparison comparison = comparisonRepository.findByComparison(criteriaDto.getComparison());
        if (comparison == null) {
            throw new IllegalArgumentException("Invalid comparison: " + criteriaDto.getComparison());
        }

        validateAllowedComparison(criteriaDto, criteria);

        criteria.setComparison(comparison);

        criteria.setValue(criteriaDto.getValue());

        validateCriteria(criteria);

        return criteria;
    }

    private void validateAllowedComparison(CriteriaDto criteriaDto, Criteria criteria) {
        String typeValue = criteria.getType().getType();
        String comparisonValue = criteriaDto.getComparison();

        List<String> allowed = allowedComparisons.get(typeValue);
        if (allowed == null || !allowed.contains(comparisonValue)) {
            throw new IllegalArgumentException("Comparison '" + comparisonValue + "' is not allowed for type '" + typeValue + "'");
        }
    }

    private void validateCriteria(Criteria criteria) {
        String typeValue = criteria.getType().getType();
        String criteriaValue = criteria.getValue();

        if ("Amount".equals(typeValue) && !criteriaValue.matches("\\d+(\\.\\d+)?")) {
            throw new IllegalArgumentException("Invalid value format for Amount type: " + criteria.getValue());
        }

        if ("Date".equals(typeValue) && !criteriaValue.matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new IllegalArgumentException("Invalid value format for Date type: " + criteria.getValue());
        }
    }

}
