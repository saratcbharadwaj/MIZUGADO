package com.mizugado.backend.dto;

// This record defines the expected JSON for a signup request:
// { "username": "someuser", "password": "somepassword" }
public record SignUpRequest(String username, String password) {
}