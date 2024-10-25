package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthenRepository extends JpaRepository<UserEntity,Integer> {
    UserEntity findUserEntitiesByEmail(String email);
}
