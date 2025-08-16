package com.mizugado.backend.controller;

import com.mizugado.backend.dto.AuditRequest;
import com.mizugado.backend.dto.ModelResponse;
import com.mizugado.backend.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/audit")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @PostMapping
    public Mono<ModelResponse> getAuditResult(@RequestBody AuditRequest request) {
        return auditService.performAudit(request.code());
    }
}