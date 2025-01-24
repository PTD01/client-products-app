package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/cosmetic-products")
public class CosmeticProductsController {

    private final CosmeticProductRepository cosmeticProductRepository;

    public CosmeticProductsController(CosmeticProductRepository cosmeticProductRepository) {
        this.cosmeticProductRepository = cosmeticProductRepository;
    }

    @GetMapping
    public List<CosmeticProduct> getCosmeticProducts() {
        return cosmeticProductRepository.findAll();
    }

    @GetMapping("/{id}")
    public CosmeticProduct getCosmeticProduct(@PathVariable Long id) {
        return cosmeticProductRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createCosmeticProduct(@RequestBody CosmeticProduct cosmeticProduct) throws URISyntaxException {
        CosmeticProduct savedProduct = cosmeticProductRepository.save(cosmeticProduct);
        return ResponseEntity.created(new URI("/cosmetic-products/" + savedProduct.getId())).body(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateCosmeticProduct(@PathVariable Long id, @RequestBody CosmeticProduct cosmeticProduct) {
        CosmeticProduct currentProduct = cosmeticProductRepository.findById(id).orElseThrow(RuntimeException::new);
        currentProduct.setName(cosmeticProduct.getName());
        currentProduct.setDescription(cosmeticProduct.getDescription());
        currentProduct.setPrice(cosmeticProduct.getPrice());
        currentProduct = cosmeticProductRepository.save(currentProduct);
        return ResponseEntity.ok(currentProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCosmeticProduct(@PathVariable Long id) {
        cosmeticProductRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
