package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.CommentDTO;
import com.example.finalprojetc06.entity.CommentEntity;
import com.example.finalprojetc06.entity.ProductEntity;
import com.example.finalprojetc06.entity.UserEntity;
import com.example.finalprojetc06.repository.CommentRepository;
import com.example.finalprojetc06.repository.ProductRepository;
import com.example.finalprojetc06.repository.UsersRepository;
import com.example.finalprojetc06.request.CommentRequest;
import com.example.finalprojetc06.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public CommentDTO addComment(CommentRequest commentRequest) {
        Optional<UserEntity> user = usersRepository.findById(commentRequest.idUser());
        Optional<ProductEntity> product = productRepository.findById(commentRequest.idProduct());
        if(user.isPresent()&&product.isPresent()){
            ProductEntity productEntity = new ProductEntity();
            productEntity.setId(commentRequest.idProduct());
            UserEntity userEntity = new UserEntity();
            userEntity.setId(commentRequest.idUser());
            CommentEntity comment = new CommentEntity();
            comment.setEvaluate(commentRequest.evaluate());
            comment.setDescription(commentRequest.content());
            comment.setProducts(productEntity);
            comment.setUsers(userEntity);
            comment.setCreateDay(commentRequest.createDay());
            CommentEntity comment1 = commentRepository.save(comment);
            System.out.println(comment1);
            return new CommentDTO(comment1.getId(),
                    baseUrl+comment1.getUsers().getAvatar(),
                    comment1.getUsers().getFullName(),
                    comment1.getDescription(),
                    comment1.getEvaluate(),
                    comment1.getCreateDay());
        }

        return null;
    }

    @Override
    public List<CommentDTO> listCommentByIdProduct(int idProduct) {
        Optional<ProductEntity> productEntity = productRepository.findById(idProduct);
        if(productEntity.isPresent()){
            ProductEntity product = new ProductEntity();
            product.setId(idProduct);
            return commentRepository.findCommentEntitiesByProducts(product).stream().map(item->{
                return new CommentDTO(item.getId(),
                        baseUrl+item.getUsers().getAvatar(),
                        item.getUsers().getFullName(),
                        item.getDescription(),
                        item.getEvaluate(),
                        item.getCreateDay());
            }).toList();
        }

        return null;
    }
}
