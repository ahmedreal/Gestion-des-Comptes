package org.sid.web;

import java.util.List;

import javax.transaction.Transactional;

import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
import org.sid.entities.Compte;
import org.sid.entities.Operation;
import org.sid.entities.Retrait;
import org.sid.entities.Versement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
@RequestMapping("/api/operations")
public class OperationController {
	@Autowired
	OperationRepository operationRepository;
	@Autowired
	CompteRepository compteRepository;
	
	@GetMapping("/")
	public List<Operation> getOperations() {
		return operationRepository.findAll();
	}
	
	@GetMapping("/byCompte/{codeCompte}")
	public List<Operation> getOperations(@PathVariable("codeCompte") String codeCompte) {
		Compte cpt = compteRepository.getOne(codeCompte);
		return operationRepository.findByCompte(cpt);
	}
	
	@GetMapping("/{numero}")
	public Operation getOperation( @PathVariable("numero") long numero) {
		return operationRepository.getOne(numero);
	}

	@PostMapping(path="/versement")
	@ResponseStatus(HttpStatus.OK)
	public void versement( @RequestBody Versement versement) {
		double solde = versement.getCompte().getSolde() + versement.getMontant();
		operationRepository.save(versement);
		Compte cpt = compteRepository.getOne(versement.getCompte().getCodeCompte());
		cpt.setSolde(solde);
		compteRepository.save(cpt);
		
	}
	
	@PostMapping(path="/retrait")
	@ResponseStatus(HttpStatus.OK)
	public void retrait( @RequestBody Retrait retrait) {
		double solde = retrait.getCompte().getSolde() - retrait.getMontant();
		operationRepository.save(retrait);
		Compte cpt = compteRepository.getOne(retrait.getCompte().getCodeCompte());
		cpt.setSolde(solde);
		compteRepository.save(cpt);
	}
	
}
