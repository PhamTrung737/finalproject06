package com.example.finalprojetc06.exeption;

import com.example.finalprojetc06.response.BaseRespone;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CentralException {

   @ExceptionHandler({AuthenException.class})
    public ResponseEntity<?> handelAuthenException (AuthenException authenException){
       BaseRespone baseRespone = new BaseRespone(500,"",authenException.getMessage());
       return  new ResponseEntity<>(baseRespone, HttpStatus.OK);
   }

   @ExceptionHandler({CategoryException.class})
    public ResponseEntity<?> handelCategoryException (CategoryException categoryException){
       BaseRespone baseRespone = new BaseRespone(500,"",categoryException.getMessage());
       return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
   }

    @ExceptionHandler({FileExeption.class})
    public ResponseEntity<?> handelFileExeption (FileExeption fileExeption){
        BaseRespone baseRespone = new BaseRespone(500,"",fileExeption.getMessage());
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @ExceptionHandler({ImageException.class})
    public ResponseEntity<?> handelImageException (ImageException ImageException){
        BaseRespone baseRespone = new BaseRespone(500,"",ImageException.getMessage());
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @ExceptionHandler({ProductExeption.class})
    public ResponseEntity<?> handelProductExeption (ProductExeption productExeption){
        BaseRespone baseRespone = new BaseRespone(500,"",productExeption.getMessage());
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @ExceptionHandler({ProductInCartException.class})
    public ResponseEntity<?> handelProductInCartException (ProductInCartException product){
        BaseRespone baseRespone = new BaseRespone(500,"",product.getMessage());
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
