package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UserEntity,Integer> {
    UserEntity findUserEntitiesByEmail(String email);
}
