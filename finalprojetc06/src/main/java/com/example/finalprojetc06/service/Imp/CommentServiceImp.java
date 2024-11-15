package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.CommentDTO;
import com.example.finalprojetc06.entity.CommentEntity;
import com.example.finalprojetc06.entity.ProductEntity;
import com.example.finalprojetc06.entity.UserEntity;
import com.example.finalprojetc06.exeption.CommentException;
import com.example.finalprojetc06.exeption.ProductExeption;
import com.example.finalprojetc06.repository.CommentRepository;
import com.example.finalprojetc06.repository.ProductRepository;
import com.example.finalprojetc06.repository.UsersRepository;
import com.example.finalprojetc06.request.CommentRequest;
import com.example.finalprojetc06.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
            CommentEntity comment = new CommentEntity();
            comment.setDescription(commentRequest.content());
            comment.setEvaluate(commentRequest.evaluate());
            comment.setUsers(user.get());
            comment.setProducts(product.get());
            comment.setCreateDay(commentRequest.createDay());
            CommentEntity comment1 = commentRepository.save(comment);
            String url = "";
            if(!comment1.getUsers().getAvatar().isEmpty()){
                url = baseUrl + comment1.getUsers().getAvatar();
            }
            return new CommentDTO(comment1.getId(),

                    comment1.getUsers().getFullName(),
                    url,
                    comment1.getDescription(),
                    comment1.getEvaluate(),
                    comment1.getCreateDay());
        }else {
            throw new CommentException("The user ID or product ID does not exist.");
        }


    }

    @Override
    public List<CommentDTO> listCommentByIdProduct(int idProduct) {
        Optional<ProductEntity> productEntity = productRepository.findById(idProduct);

        if(productEntity.isPresent()){
            ProductEntity product = new ProductEntity();
            product.setId(idProduct);
            List<CommentEntity> listComment = commentRepository.findCommentEntitiesByProducts(product);
            return listComment.stream().map(item->{
                String url = "";
                if(!item.getUsers().getAvatar().isEmpty()){
                    url = baseUrl + item.getUsers().getAvatar();
                }
                return new CommentDTO(item.getId(),

                        item.getUsers().getFullName(),
                        url,
                        item.getDescription(),
                        item.getEvaluate(),
                        item.getCreateDay());
            }).toList();

        }else {
            throw new ProductExeption("The product ID does not exist.");
        }


    }
}
