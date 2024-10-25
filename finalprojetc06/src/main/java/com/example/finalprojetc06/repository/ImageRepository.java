package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity,Integer> {
    List<ImageEntity> findByBanner(boolean key);
}
