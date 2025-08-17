package com.mizugado.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.mizugado.backend.dto.ModelResponse;

import reactor.core.publisher.Mono;

@Service
public class AuditService {

    private final WebClient webClient;

    // A simple record to match the Python API's expected input { "text": "..." }
    private record ModelRequest(String text) {

    }

    public AuditService(WebClient.Builder webClientBuilder, @Value("${api.service.url}") String apiUrl) {

        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
    }

    public Mono<ModelResponse> performAudit(String contractCode) {
        ModelRequest requestPayload = new ModelRequest(contractCode);

        return this.webClient.post()
                .uri("/predict") // The endpoint on the Python server
                .bodyValue(requestPayload)
                .retrieve() // Execute the request
                .bodyToMono(ModelResponse.class); // Convert the response JSON to our record
    }
}
