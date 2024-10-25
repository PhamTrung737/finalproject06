package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.ConnectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionRepository extends JpaRepository<ConnectionEntity,Integer> {
}
