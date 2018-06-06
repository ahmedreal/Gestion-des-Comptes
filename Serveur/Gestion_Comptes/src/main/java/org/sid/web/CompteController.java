package org.sid.web;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.json.JSONString;
import org.sid.dao.ClientRepository;
import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
import org.sid.entities.Client;
import org.sid.entities.Compte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comptes")
public class CompteController {
	@Autowired
	CompteRepository compteRepository;
	@Autowired
	ClientRepository clientRepository;
	
	@GetMapping("/")
	public List<Compte> getComptes() {
		return compteRepository.findAll();
	}
	
	@GetMapping("/listcodeComptes")
	public List<String> getCodeComptes() {
		return compteRepository.getAllcodeComptes();
	}			
	
	@GetMapping("/clientComptes/{username}")
	public List<Compte> getClientComptes(@PathVariable("username") String username) {
		Client client = clientRepository.findByUsername(username);
		return compteRepository.findByClient(client);
	}
		
	@GetMapping("/{codeCpt}")
	public Compte getCompte(@PathVariable("codeCpt") String codeCpt) { 
		return compteRepository.getOne(codeCpt);
	} 
	
	@PostMapping(path="/create")
	public Compte createCompte( @RequestBody Client client) {
		Compte cpt = ((List<Compte>) client.getComptes()).get(0); 
		Compte compte = new Compte(cpt.getCodeCompte(),cpt.getDateCreation(),cpt.getSolde(),client);
		return compteRepository.save(compte);
	}
	
}
