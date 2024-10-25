package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.ImageDTO;
import com.example.finalprojetc06.dto.ProductDTO;
import com.example.finalprojetc06.dto.ProductDetailDTO;
import com.example.finalprojetc06.dto.ProductLazyLoadDTO;
import com.example.finalprojetc06.entity.*;
import com.example.finalprojetc06.exeption.ProductExeption;

import com.example.finalprojetc06.repository.*;
import com.example.finalprojetc06.request.ProductRequest;
import com.example.finalprojetc06.request.ProductUpdate;
import com.example.finalprojetc06.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private MetarialRepository metarialRepository;

    @Transactional
    @Override
    public ProductEntity addProduct(ProductRequest product) {

        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.name());
        productEntity.setPrice(product.price());
        productEntity.setDescription(product.description());
        productEntity.setSize(product.size());
        CategoryEntity category = new CategoryEntity();
        category.setId(product.idCategory());
        productEntity.setCategorys(category);
        MetarialEntity metarial = new MetarialEntity();
        metarial.setId(product.idMaterial());
        productEntity.setMetarials(metarial);
        TypeEntity type = new TypeEntity();
        type.setId(product.idType());
        productEntity.setTypes(type);
        return productRepository.save(productEntity);

    }

    @Override
    public ProductLazyLoadDTO getListProduct(int page, int pageSize) {
        Pageable page1 = PageRequest.of(page,pageSize);


        return convertProductEntityToProductLazyLoadDTO(productRepository.findAll(page1),productRepository.findAll());
    }

    @Override
    public ProductDetailDTO getProductById(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isPresent()){
            return convertProductEntityToProductDetailDTO(product.get());
        }else {
            throw new ProductExeption("Id product empty");
        }
    }

    @Override
    public ProductLazyLoadDTO getProductByCategory(String category, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page,pageSize);
        ProductLazyLoadDTO listProduct = null;
        if(category.equalsIgnoreCase("Azur-Lane")){
            CategoryEntity category1 = new CategoryEntity();
            if(categoryRepository.findById(1).isPresent()){
                category1 = categoryRepository.findById(1).get();
            }
           listProduct = convertProductEntityToProductLazyLoadDTO(productRepository.findProductEntityByCategorys(category1,pageable),
                   productRepository.findProductEntityByCategorys(category1));

        } else if (category.equalsIgnoreCase("Arknights")) {
            CategoryEntity category1 = new CategoryEntity();
            if(categoryRepository.findById(2).isPresent()){
                category1 = categoryRepository.findById(2).get();
            }
            listProduct = convertProductEntityToProductLazyLoadDTO(productRepository.findProductEntityByCategorys(category1,pageable),
                    productRepository.findProductEntityByCategorys(category1));
        } else if (category.equalsIgnoreCase("Mahjong-Soul")) {
            CategoryEntity category1 = new CategoryEntity();
            if(categoryRepository.findById(3).isPresent()){
                category1 = categoryRepository.findById(3).get();
            }
            listProduct = convertProductEntityToProductLazyLoadDTO(productRepository.findProductEntityByCategorys(category1,pageable),
                    productRepository.findProductEntityByCategorys(category1));
        }

        return  listProduct;
    }

    @Override
    public String deleteProductById(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);

        if(product.isPresent()){
            productRepository.deleteById(id);
            return "Delete Success";
        }else {
            throw new ProductExeption("Id product empty");
        }
    }

    @Override
    public ProductDetailDTO updateProductById(int id,ProductUpdate productUpdate) {

        Optional<ProductEntity> product = productRepository.findById(id);
        Optional<TypeEntity> type = typeRepository.findById(productUpdate.idType());
        Optional<CategoryEntity> category = categoryRepository.findById(productUpdate.idCategory());

        Optional<MetarialEntity> metarial = metarialRepository.findById(productUpdate.idMetarial());

        if(product.isPresent()&&type.isPresent()&&metarial.isPresent()&&category.isPresent()){
            ProductEntity productEntity = new ProductEntity();
            productEntity.setId(id);
            productEntity.setName(productUpdate.name());
            productEntity.setDescription(productUpdate.description());
            productEntity.setSize(productUpdate.size());
            productEntity.setPrice(productUpdate.price());
            MetarialEntity metarial1 = new MetarialEntity();
            metarial1.setId(productUpdate.idMetarial());
            TypeEntity type1 = new TypeEntity();
            type1.setId(productUpdate.idType());
            CategoryEntity category1 = new CategoryEntity();
            category1.setId(productUpdate.idCategory());
            productEntity.setCategorys(category1);
            productEntity.setTypes(type1);
            productEntity.setMetarials(metarial1);

            return convertProductEntityToProductDetailDTO(productRepository.save(productEntity));
        }else {
            throw new ProductExeption("product or type or category empty");
        }

    }


    @Override
    public ProductLazyLoadDTO getProductByIdConnection(int idConnection, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page,pageSize);
        ConnectionEntity connection ;
        Optional<ConnectionEntity> connection1 = connectionRepository.findById(idConnection);
        if(connection1.isPresent()){
            connection = connection1.get();
        }else {
            throw new ProductExeption("Id connection empty");
        }
        return convertProductEntityToProductLazyLoadDTO(productRepository.findProductEntityByConnections(connection,pageable),
                productRepository.findProductEntityByConnections(connection));
    }

    @Override
    public ProductDetailDTO updateProductFollowConnection(int id, int idConnection) {
        Optional<ProductEntity> product = productRepository.findById(id);
        Optional<ConnectionEntity> connection = connectionRepository.findById(idConnection);
        System.out.println(id);
        System.out.println(idConnection);
        if(product.isPresent()&&connection.isPresent()){
            ProductEntity productEntity = new ProductEntity();
            productEntity.setId(id);
            productEntity.setName(product.get().getName());
            productEntity.setPrice(product.get().getPrice());
            productEntity.setDescription(product.get().getDescription());
            productEntity.setSize(product.get().getSize());
            productEntity.setTypes(product.get().getTypes());
            productEntity.setCategorys(product.get().getCategorys());
            productEntity.setMetarials(product.get().getMetarials());
            ConnectionEntity connection1 = new ConnectionEntity();
            connection1.setId(idConnection);
            productEntity.setConnections(connection1);
            return convertProductEntityToProductDetailDTO(productRepository.save(productEntity));
        }else {
            throw new ProductExeption("product or connection empty");
        }
    }


    public ProductLazyLoadDTO convertProductEntityToProductLazyLoadDTO(Page<ProductEntity> product,List<ProductEntity> productEntities){
        List<ProductDTO> listProduct = product.stream().map(item->{
            String image = "";
            String imageHover = "";
            if(item.getListImage().size()>1){
                image = baseUrl + item.getListImage().get(0).getImage();
                imageHover = baseUrl + item.getListImage().get(1).getImage();
            }
            return new ProductDTO(item.getId(),item.getPrice(),item.getName(),image,imageHover);
        }).toList();
        int totalPages = product.getTotalPages();
        return new ProductLazyLoadDTO(totalPages,productEntities.size(),listProduct);
    }

    public ProductDetailDTO convertProductEntityToProductDetailDTO(ProductEntity product1){
        List<ImageDTO> listImage = new ArrayList<>();
        if(product1.getListImage() != null){
            listImage = product1.getListImage().stream().map(item->{
                return new ImageDTO(item.getId(),baseUrl+item.getImage());
            }).toList();
        }
        return new ProductDetailDTO(
                product1.getId(),
                product1.getName(),
                product1.getPrice(),
                listImage,
                product1.getTypes().getDescription(),
                product1.getMetarials().getDescription(),
                product1.getDescription(),
                product1.getSize()
        );
    }
}
