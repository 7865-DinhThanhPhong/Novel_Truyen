package com.example.noveltruyen.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class JwtConfig {
    @Value("${JWT_SECRET_KEY}")
    private String jwtSecret ;

    @Value("${JWT_EXPIRATION_MS}")
    private int jwtExpirationMs;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public String getSecretKey (){
        return jwtSecret;
    }

    public long getExpirationTime (){
        return jwtExpirationMs;
    }
}
