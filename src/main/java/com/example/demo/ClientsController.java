package com.example.demo;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ClientsController {
    private final ClientRepository clientRepository;

    public ClientsController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
    }

    @PostMapping
    public ResponseEntity createClient(@Valid @RequestBody Client client) throws URISyntaxException {
        Client savedClient = clientRepository.save(client);
        return ResponseEntity.created(new URI("/clients/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @Valid @RequestBody Client client) {
        Client currentClient = clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
        currentClient.setName(client.getName());
        currentClient.setEmail(client.getEmail());
        currentClient = clientRepository.save(currentClient); // Save the updated client
        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return ResponseEntity.status(404).body("Client not found");
    }
}
