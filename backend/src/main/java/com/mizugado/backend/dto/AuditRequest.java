package com.mizugado.backend.dto;

// Defines the JSON the frontend will send: { "code": "..." }
public record AuditRequest(String code) {
}