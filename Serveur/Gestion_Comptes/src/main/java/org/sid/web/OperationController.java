package org.sid.web;

import java.util.List;

import javax.transaction.Transactional;

import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
import org.sid.entities.Compte;
import org.sid.entities.Operation;
import org.sid.entities.Retrait;
import org.sid.entities.Versement;
import org.sid.entities.VirementEmis;
import org.sid.entities.VirementRecu;
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
	public List<Operation> versement( @RequestBody Versement versement) {
		operationRepository.save(versement);
		Compte cpt = compteRepository.getOne(versement.getCompte().getCodeCompte());
		double solde = cpt.getSolde() + versement.getMontant();
		cpt.setSolde(solde);
		compteRepository.save(cpt);
		return operationRepository.findByCompte(cpt);
	}
	
	@PostMapping(path="/retrait")
	public List<Operation> retrait( @RequestBody Retrait retrait) {
		operationRepository.save(retrait);
		Compte cpt = compteRepository.getOne(retrait.getCompte().getCodeCompte());
		double solde = cpt.getSolde() - retrait.getMontant();
		cpt.setSolde(solde);
		compteRepository.save(cpt);
		return operationRepository.findByCompte(cpt);
	}
	
	@PostMapping(path="/virement")
	@ResponseStatus(HttpStatus.OK)
	public void virement( @RequestBody VirementRecu virement) {
		
		Compte compteCrediter = compteRepository.getOne(virement.getCodeCompteTiers());
		Compte compteDebiter = compteRepository.getOne(virement.getCompte().getCodeCompte());
		double soldeCompteDist = compteCrediter.getSolde() + virement.getMontant();
		double soldeCompteOrig = compteDebiter.getSolde() - virement.getMontant();
		compteCrediter.setSolde(soldeCompteDist);
		compteDebiter.setSolde(soldeCompteOrig);
		VirementRecu vr = new VirementRecu(virement.getDateOperation(), virement.getMontant(), compteCrediter, compteDebiter.getCodeCompte());
		VirementEmis ve = new VirementEmis(virement.getDateOperation(), virement.getMontant(), compteDebiter, compteCrediter.getCodeCompte());
		operationRepository.save(vr);
		operationRepository.save(ve);
		compteRepository.save(compteCrediter);
		compteRepository.save(compteDebiter);
		
		//System.out.println("compte1 : "+virement.getCompte().getCodeCompte() +"compte 2 : "+virement.getCodeCompteTiers() +"montant : "+virement.getMontant());

	}
	
}
