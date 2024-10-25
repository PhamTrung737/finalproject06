package com.example.finalprojetc06.security;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.exeption.AuthenException;
import com.example.finalprojetc06.request.LoginRequest;
import com.example.finalprojetc06.service.AuthenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomAuthenProvider implements AuthenticationProvider {

    @Autowired
    private AuthenService authenService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        LoginRequest authenRequest = new LoginRequest();
        authenRequest.setPassword(password);
        authenRequest.setEmail(email);

        List<RolesDTO> listRoles = authenService.checkLogin(authenRequest);

        if(!listRoles.isEmpty()){
            List<SimpleGrantedAuthority> authorityList = listRoles.stream()
                    .map(item -> new SimpleGrantedAuthority(item.roles())).toList();

            return new UsernamePasswordAuthenticationToken("","",authorityList);
        }else {
            throw new AuthenException(" tài khoản mật khẩu không đúng hoặc chưa được đăng ký");
        }


    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
