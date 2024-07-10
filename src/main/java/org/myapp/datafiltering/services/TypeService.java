package org.myapp.datafiltering.services;

import org.myapp.datafiltering.dtos.TypeDto;
import org.myapp.datafiltering.models.Type;
import org.myapp.datafiltering.repositories.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeService {

    private final TypeRepository typeRepository;

    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public List<TypeDto> getAllTypes() {
        List<Type> types = typeRepository.findAll();
        return types.stream()
                .map(this::getType)
                .collect(Collectors.toList());
    }

    private TypeDto getType(Type type) {
        TypeDto typeDto = new TypeDto();
        typeDto.setId(type.getId());
        typeDto.setType(type.getType());
        return typeDto;
    }

}
