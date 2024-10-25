package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.ProductInCartByUserDTO;
import com.example.finalprojetc06.dto.ProductInCartsDTO;
import com.example.finalprojetc06.entity.*;
import com.example.finalprojetc06.exeption.ProductInCartException;
import com.example.finalprojetc06.repository.*;
import com.example.finalprojetc06.request.ProductInCartsRequest;
import com.example.finalprojetc06.service.ProductInCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Collection;

import java.util.List;
import java.util.Optional;

@Service
public class ProductInCartsServiceImp implements ProductInCartService {

    @Autowired
    private CartsRepository cartsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductInCartRepository productInCartRepository;

    @Autowired
    private MoneyRepository moneyRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Transactional
    @Override
    public List<ProductInCartsDTO> addListProductInCart(List<ProductInCartsRequest> listProduct,int idUser,int idPayment,int idMoney) {

        Optional<UserEntity> userEntity = usersRepository.findById(idUser);
        Optional<PaymentEntity> payment = paymentRepository.findById(idPayment);
        Optional<MoneyEntity> money = moneyRepository.findById(idMoney);

        if(userEntity.isPresent()&&payment.isPresent()&&money.isPresent()){
            UserEntity user = new UserEntity();
            user.setId(idUser);
            Optional<CartsEntity> cart = cartsRepository.findCartsEntitiesByStatusAndUsers(true,user);

            PaymentEntity payment1 = new PaymentEntity();
            payment1.setId(idPayment);
            MoneyEntity moneyEntity= new MoneyEntity();
            moneyEntity.setId(idMoney);
            CartsEntity carts = new CartsEntity();
            if(cart.isPresent()){
                carts.setId(cart.get().getId());
            }else {
                CartsEntity carts1 = new CartsEntity();
                carts1.setUsers(user);
                carts1.setPayments(payment1);
                carts1.setStatus(true);
                carts1.setMoneyEntity(moneyEntity);
                CartsEntity carts2 = cartsRepository.save(carts1);
                carts.setId(carts2.getId());
            }
            List<ProductInCartEntity> list = listProduct.stream().map(item->{
                ProductInCartEntity product = new ProductInCartEntity();
                product.setQuantity(item.quantity());
                ProductEntity product1 = new ProductEntity();
                product1.setId(item.idProduct());
                product.setProducts(product1);
                product.setCarts(carts);
                product.setCreateDay(item.createDay());
                return product;
            }).toList();

            return list.stream().map(item->{
                Collection<ProductInCartEntity> productInCartEntity = productInCartRepository.findAllActiveUsers(carts.getId(),item.getProducts().getId());
                if(!productInCartEntity.isEmpty()){
                    List<ProductInCartsDTO> list1 = productInCartEntity.stream().map(element->{
                        return new ProductInCartsDTO(element.getId(),element.getProducts().getName(),element.getQuantity(),element.getCreateDay());
                    }).toList();
                    item.setId(list1.get(0).id());
                }
                ProductInCartEntity product = productInCartRepository.save(item);
                return new ProductInCartsDTO(product.getId(),
                        product.getProducts().getName(),
                        product.getQuantity(),
                        product.getCreateDay());
            }).toList();
        }else {
            throw new ProductInCartException("user or payment or money empty");
        }


    }

    @Override
    public List<ProductInCartByUserDTO> getListProductInCartByUser(int idUser) {
        UserEntity user = new UserEntity();
        user.setId(idUser);
        Optional<CartsEntity> cart = cartsRepository.findCartsEntitiesByStatusAndUsers(true,user);
        if(cart.isPresent()){
            CartsEntity carts = new CartsEntity();
            carts.setId(cart.get().getId());
            List<ProductInCartEntity> listProduct = productInCartRepository.findProductInCartEntitiesByCarts(carts);
            return listProduct.stream().map(item->{
                return new ProductInCartByUserDTO(item.getId(),
                        baseUrl+item.getProducts().getListImage().get(0).getImage(),
                        item.getProducts().getName(),
                        item.getProducts().getPrice(),
                        item.getQuantity());
            }).toList();
        }
        return null;
    }
}
