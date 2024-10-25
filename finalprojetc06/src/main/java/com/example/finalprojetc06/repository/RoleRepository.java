package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RolesEntity,Integer> {
}
