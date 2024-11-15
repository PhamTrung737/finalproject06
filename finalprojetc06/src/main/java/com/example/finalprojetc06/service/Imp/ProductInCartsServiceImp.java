package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.ProductByIdUserDTO;
import com.example.finalprojetc06.dto.ProductInCartByUserDTO;
import com.example.finalprojetc06.dto.ProductInCartsDTO;
import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.entity.*;
import com.example.finalprojetc06.exeption.CartsException;
import com.example.finalprojetc06.exeption.ProductInCartException;
import com.example.finalprojetc06.exeption.UserException;
import com.example.finalprojetc06.repository.*;
import com.example.finalprojetc06.request.ProductInCartsRequest;
import com.example.finalprojetc06.service.ProductInCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
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
            throw new ProductInCartException("The user ID or payment ID or money ID does not exist.");
        }


    }

    @Override
    public List<ProductInCartByUserDTO> getListProductInCartByUser(int idUser) {
        Optional<UserEntity> user = usersRepository.findById(idUser);
        if(user.isPresent()){
            Optional<CartsEntity> cart = cartsRepository.findCartsEntitiesByStatusAndUsers(true,user.get());
            if(cart.isPresent()){
                CartsEntity carts = new CartsEntity();
                carts.setId(cart.get().getId());
                List<ProductInCartEntity> listProduct = productInCartRepository.findProductInCartEntitiesByCarts(carts);
                return listProduct.stream().map(item->{
                    return new ProductInCartByUserDTO(item.getProducts().getId(),
                            baseUrl+item.getProducts().getListImage().get(0).getImage(),
                            item.getProducts().getName(),
                            item.getProducts().getPrice(),
                            item.getQuantity());
                }).toList();
            }else {
                throw new ProductInCartException("There is no cart id with status true");
            }
        }else {
            throw new UserException("The user ID does not exist.");
        }


    }

    @Override
    public String checkOutCart(int idUser, int idCarts) {
        Optional<UserEntity> user = usersRepository.findById(idUser);
        Optional<CartsEntity> carts = cartsRepository.findById(idCarts);
        if(user.isPresent()&&carts.isPresent()){
            Optional<CartsEntity> carts1 = cartsRepository.findCartsEntitiesByStatusAndUsers(true,user.get());
            if(carts1.isPresent()){
                 CartsEntity carts2 = carts1.get();
                 carts2.setStatus(false);
                 cartsRepository.save(carts2);
                 return "Payment successfully";
            }else {
                throw new ProductInCartException("Cart id has been paid");
            }
        }else {
            throw new ProductInCartException(" The user ID or cart ID does not exist.");
        }

    }

    @Override
    public List<ProductByIdUserDTO> getListProductInCartsById(int id) {
       Optional<UserEntity> user = usersRepository.findById(id);
       if(user.isPresent()){
           List<CartsEntity> listCarts = cartsRepository.findCartsEntitiesByUsers(user.get());
           List<ProductByIdUserDTO> listProduct = new ArrayList<>();
           if(!listCarts.isEmpty()){
               for (CartsEntity cart:listCarts
                    ) {
                   boolean status = cart.isStatus();
                   List<ProductInCartEntity> inCartEntityList = productInCartRepository.findProductInCartEntitiesByCarts(cart);
                   if(!inCartEntityList.isEmpty()){
                       for (ProductInCartEntity product:inCartEntityList
                       ) {
                           String url = "";
                           if(!product.getProducts().getListImage().isEmpty()){
                               url= baseUrl + product.getProducts().getListImage().get(0).getImage();
                           }
                           ProductByIdUserDTO product1 = new ProductByIdUserDTO(product.getId(),
                                   url,
                                   product.getProducts().getName(),
                                   product.getProducts().getPrice(),
                                   status);
                           listProduct.add(product1);
                       }
                   }
               }
           }else {
               throw new CartsException("Users who have not purchased");
           }
           List< ProductByIdUserDTO> newList = new ArrayList<ProductByIdUserDTO>();
           if(listProduct.size()<=20){
               newList = listProduct;
           }else {
               newList = listProduct.subList(listProduct.size()-21,listProduct.size());
           }
           return  newList;
       }else {
           throw  new UserException("The user ID does not exits");
       }


    }
}
