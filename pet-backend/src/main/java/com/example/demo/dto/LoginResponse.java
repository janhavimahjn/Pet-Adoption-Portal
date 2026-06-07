package com.example.demo.dto;

public class LoginResponse {

    private String token;
    private Long id;
    private String role;

    public LoginResponse(
            String token,
            Long id,
            String role
    ) {
        this.token = token;
        this.id = id;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getRole() {
        return role;
    }
}