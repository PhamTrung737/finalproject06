package com.example.finalprojetc06.repository;


import com.example.finalprojetc06.entity.CartsEntity;
import com.example.finalprojetc06.entity.ProductInCartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Collection;
import java.util.List;

@Repository
public interface ProductInCartRepository extends JpaRepository<ProductInCartEntity,Integer> {

    @Query("SELECT u FROM productincart u WHERE u.carts.id =?1 and u.products.id=?2")
    Collection<ProductInCartEntity> findAllActiveUsers(int idCarts,int idProduct);

    List<ProductInCartEntity> findProductInCartEntitiesByCarts(CartsEntity carts);

}
