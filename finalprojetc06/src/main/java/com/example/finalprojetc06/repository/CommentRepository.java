package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.CommentEntity;
import com.example.finalprojetc06.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity,Integer> {
    List<CommentEntity> findCommentEntitiesByProducts(ProductEntity product);
}
