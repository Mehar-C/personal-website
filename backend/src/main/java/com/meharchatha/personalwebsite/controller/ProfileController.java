package com.meharchatha.personalwebsite.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @GetMapping
    public Map<String, Object> getProfile() {
        return Map.of(
                "name", "Mehar Chatha",
                "title", "Software Engineer & Creative Technologist",
                "location", "Your City, Your Country",
                "summary", "I build delightful digital experiences with clean code, strong design, and smooth animations.",
                "skills", List.of("Java", "TypeScript", "React", "Spring Boot", "REST APIs", "UI/UX"),
                "projects", List.of(
                        Map.of(
                                "name", "Interactive Portfolio",
                                "description", "A responsive, animated portfolio showcasing my work and personality.",
                                "link", "#projects"
                        ),
                        Map.of(
                                "name", "API-Driven Dashboard",
                                "description", "Real-time data visualization dashboard powered by Java and TypeScript.",
                                "link", "#projects"
                        )
                )
        );
    }
}


