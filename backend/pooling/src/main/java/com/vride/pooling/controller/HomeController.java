package com.vride.pooling.controller;

import org.springframework.web.bind.annotation.*;

import com.vride.pooling.representation.*;

@RestController
@CrossOrigin
public class HomeController {
	
	@GetMapping("/ping")
	public Ping ping() {
		return new Ping("Hello World");
	}
}