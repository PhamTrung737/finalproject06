package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.TypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<TypeEntity,Integer> {
}
