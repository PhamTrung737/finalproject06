package com.example.finalprojetc06.filter;

import com.example.finalprojetc06.dto.AuthorityDTO;
import com.example.finalprojetc06.repository.UsersRepository;
import com.example.finalprojetc06.response.BaseResponeError;
import com.example.finalprojetc06.service.UserService;
import com.example.finalprojetc06.utils.JwtsToken;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class CustomFilter extends OncePerRequestFilter {

@Autowired
private JwtsToken jwtsToken;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorHeader = request.getHeader("Authorization");

        if (authorHeader != null && authorHeader.startsWith("Bearer ")) {
            String token = authorHeader.substring(7);

            String data = jwtsToken.decodeToken(token);
            int tokenVersionInToken = Integer.parseInt(jwtsToken.decodeTokenVersion(token));
            int idUser = Integer.parseInt(jwtsToken.decodeTokenID(token));

            if (data != null && tokenVersionInToken >0 &&idUser>0 ) {

                int currentTokenVersion = userService.getUserById(idUser).getVersion();

                if (tokenVersionInToken == currentTokenVersion) {

                    List<AuthorityDTO> authorityDTOS = objectMapper.readValue(data, new TypeReference<List<AuthorityDTO>>() {});

                    List<SimpleGrantedAuthority> authorityList = authorityDTOS.stream()
                            .map(item -> new SimpleGrantedAuthority(item.authority())).toList();


                    UsernamePasswordAuthenticationToken authenToken =
                            new UsernamePasswordAuthenticationToken("", "", authorityList);


                    SecurityContextHolder.getContext().setAuthentication(authenToken);

                }else {

                    SecurityContextHolder.clearContext();
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType("application/json");
                    BaseResponeError baseResponeError = new BaseResponeError(401,"Error","Invalid token version");
                    ObjectMapper mapper =  new ObjectMapper();
                    String jsonResponse = mapper.writeValueAsString(baseResponeError);
                    response.getWriter().write(jsonResponse);
                    return;
                }

            }
        }
        filterChain.doFilter(request, response);


    }
}
