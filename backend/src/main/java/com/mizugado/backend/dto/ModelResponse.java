package com.mizugado.backend.dto;

// Defines the JSON we expect from the Python model
public record ModelResponse(String label, String meaning, double score) {
}