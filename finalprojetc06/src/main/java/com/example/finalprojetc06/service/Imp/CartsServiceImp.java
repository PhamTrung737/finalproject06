package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.entity.CartsEntity;
import com.example.finalprojetc06.entity.UserEntity;
import com.example.finalprojetc06.exeption.CartsException;
import com.example.finalprojetc06.repository.CartsRepository;
import com.example.finalprojetc06.service.CartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartsServiceImp implements CartsService {

    @Autowired
    private CartsRepository cartsRepository;

    @Override
    public int getCartTrue(boolean status,int idUser) {
        int id = 0;
        UserEntity user = new UserEntity();
        user.setId(idUser);
        Optional<CartsEntity> carts = cartsRepository.findCartsEntitiesByStatusAndUsers(status,user);
        if(carts.isPresent()){
            id = carts.get().getId();
        }else {
            throw new CartsException("There is no cart id with status true");
        }
        return id;
    }
}
