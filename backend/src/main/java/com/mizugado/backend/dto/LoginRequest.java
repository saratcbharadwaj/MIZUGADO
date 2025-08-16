package com.mizugado.backend.dto;

// This record defines the expected JSON for a login request.
public record LoginRequest(String username, String password) {
}