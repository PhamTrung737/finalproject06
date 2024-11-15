package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.CartsEntity;
import com.example.finalprojetc06.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartsRepository extends JpaRepository<CartsEntity,Integer> {
    Optional<CartsEntity> findCartsEntitiesByStatusAndUsers(boolean status, UserEntity user);
    List<CartsEntity> findCartsEntitiesByUsers(UserEntity user);
}
