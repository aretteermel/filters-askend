package org.myapp.datafiltering.services;

import jakarta.transaction.Transactional;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final TypeRepository typeRepository;
    private final ComparisonRepository comparisonRepository;

    public FilterService(FilterRepository filterRepository, TypeRepository typeRepository, ComparisonRepository comparisonRepository) {
        this.filterRepository = filterRepository;
        this.typeRepository = typeRepository;
        this.comparisonRepository = comparisonRepository;
    }

    public List<FilterDto> getAllFilterDtos() {
        List<Filter> filters = filterRepository.findAll();
        return filters.stream()
                .map(this::convertToFilterDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public FilterDto saveFilter(FilterDto filterDto) {
        Filter filter = new Filter();
        filter.setName(filterDto.getName());

        if (filterDto.getCriteria() != null) {
            List<Criteria> criteriaList = filterDto.getCriteria().stream()
                    .map(criteriaDto -> convertToCriteria(criteriaDto, filter))
                    .collect(Collectors.toList());
            filter.setCriteria(criteriaList);
        }

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
        criteria.setComparison(comparison);

        criteria.setValue(criteriaDto.getValue());

        return criteria;
    }

}
