package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.MetarialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetarialRepository extends JpaRepository<MetarialEntity,Integer> {
}
