package com.example.cycle.product.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.cycle.product.model.Product;
import com.example.cycle.product.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        try {
            productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping
    public List<Product> findAllProducts() throws Exception {
        return productRepository.getAll();
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Product>> findByName(@PathVariable String name) throws Exception {
        try {
            List<Product> products = productRepository.getByName(name);
            return ResponseEntity.status(HttpStatus.OK).body(products);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> findById(@PathVariable int id) throws Exception {
        try {
            Product product = productRepository.getById(id);
            return ResponseEntity.status(HttpStatus.OK).body(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) throws Exception {
        try {
            productRepository.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PutMapping
    public void editProduct(@RequestBody Product product) throws Exception {
        try {
            productRepository.edit(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }
}