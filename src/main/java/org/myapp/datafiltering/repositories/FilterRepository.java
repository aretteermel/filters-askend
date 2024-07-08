package org.myapp.datafiltering.repositories;

import org.myapp.datafiltering.models.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterRepository extends JpaRepository<Filter, Long> {}
