package com.example.finalprojetc06.exeption;

import com.example.finalprojetc06.response.BaseResponeError;
import com.example.finalprojetc06.response.BaseResponeOK;
import jakarta.servlet.ServletException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CentralException {


   @ExceptionHandler({CategoryException.class})
    public ResponseEntity<?> handelCategoryException (CategoryException categoryException){
       BaseResponeError baseResponeError = new BaseResponeError(500,"Error Category",categoryException.getMessage());
       return  new ResponseEntity<>(baseResponeError,HttpStatus.OK);
   }

    @ExceptionHandler({FileExeption.class})
    public ResponseEntity<?> handelFileException (FileExeption fileExeption){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error File",fileExeption.getMessage());
        return  new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({ImageException.class})
    public ResponseEntity<?> handelImageException (ImageException ImageException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error Image",ImageException.getMessage());
        return  new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({ProductExeption.class})
    public ResponseEntity<?> handelProductException (ProductExeption productExeption){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error Product",productExeption.getMessage());
        return  new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({ProductInCartException.class})
    public ResponseEntity<?> handelProductInCartException (ProductInCartException product){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error ProductInCart",product.getMessage());
        return  new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({CartsException.class})
    public ResponseEntity<?> handelCartsException (CartsException cartsException){
       BaseResponeError baseResponeError = new BaseResponeError(500,"Error Cart",cartsException.getMessage());
       return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({CommentException.class})
    public ResponseEntity<?> handelCommentException (CommentException commentException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error Comment",commentException.getMessage());
        return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({UserException.class})
    public ResponseEntity<?> handelUserException (UserException userException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error User",userException.getMessage());
        return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({ConnectionException.class})
    public ResponseEntity<?> handelConnectionException (ConnectionException connectionException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error connection",connectionException.getMessage());
        return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({TypeException.class})
    public ResponseEntity<?> handelTypeException (TypeException typeException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error type",typeException.getMessage());
        return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }

    @ExceptionHandler({MaterialException.class})
    public ResponseEntity<?> handelMaterialException (MaterialException materialException){
        BaseResponeError baseResponeError = new BaseResponeError(500,"Error material",materialException.getMessage());
        return new ResponseEntity<>(baseResponeError,HttpStatus.OK);
    }
}
