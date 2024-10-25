package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.CategoryEntity;
import com.example.finalprojetc06.entity.ConnectionEntity;
import com.example.finalprojetc06.entity.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {

         Page<ProductEntity> findProductEntityByCategorys(CategoryEntity category, Pageable pageable);

    List<ProductEntity> findProductEntityByCategorys(CategoryEntity category);

    Page<ProductEntity> findProductEntityByConnections(ConnectionEntity connection,Pageable pageable);

    List<ProductEntity>findProductEntityByConnections(ConnectionEntity connection);

}
