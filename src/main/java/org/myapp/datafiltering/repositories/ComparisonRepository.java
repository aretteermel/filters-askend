package org.myapp.datafiltering.repositories;

import org.myapp.datafiltering.models.Comparison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComparisonRepository extends JpaRepository<Comparison, Long> {
    Comparison findByComparison(String comparison);
}
