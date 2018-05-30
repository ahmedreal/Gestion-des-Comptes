package org.sid.web;

import java.util.List;

import org.json.JSONObject;
import org.json.JSONString;
import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
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
	
	@GetMapping("/")
	public List<Compte> getComptes() {
		return compteRepository.findAll();
	}
		
	@GetMapping("/{codeCpt}")
	public Compte getCompte(@PathVariable("codeCpt") String codeCpt) { 
		return compteRepository.getOne(codeCpt);
	} 
	
	@PostMapping(path="/create")
	public Compte createCompte( @RequestBody Compte compte) {
		return compteRepository.save(compte);
	}
	
}
