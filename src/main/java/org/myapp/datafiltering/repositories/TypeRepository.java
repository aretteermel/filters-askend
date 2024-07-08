package org.myapp.datafiltering.repositories;

import org.myapp.datafiltering.models.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByType(String type);
}
