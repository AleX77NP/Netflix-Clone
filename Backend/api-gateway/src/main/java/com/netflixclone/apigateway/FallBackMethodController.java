package com.netflixclone.apigateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallBackMethodController {

    @GetMapping("/userServiceFallBack")
    public String userServiceFallBackMethod() {
        return "User Service is taking longer than Expected." +
                " Please try again later";
    }

    @GetMapping("/contentServiceFallBack")
    public String contentServiceFallBackMethod() {
        return "Content Service is taking longer than Expected." +
                " Please try again later";
    }

    @GetMapping("/paymentServiceFallBack")
    public String paymentServiceFallBackMethod() {
        return "Payment Service is taking longer than Expected." +
                " Please try again later";
    }
}
