package org.sid;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.EntityManager;

import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
import org.sid.dao.ProfileRepository;
import org.sid.dao.RoleRepository;
import org.sid.entities.Admin;
import org.sid.entities.AppRole;
import org.sid.entities.Client;
import org.sid.entities.Compte;
import org.sid.entities.Profile;
import org.sid.entities.Retrait;
import org.sid.entities.Versement;
import org.sid.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class GestionComptesApplication implements CommandLineRunner{

	@Autowired
	ProfileRepository profileRepository;
	@Autowired
	CompteRepository compteRepository;
	@Autowired
	OperationRepository operationRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	AccountServiceImpl accountService;
	@Bean
	public BCryptPasswordEncoder getBCPE() {
		return new BCryptPasswordEncoder();
	}
	
	public static void main(String[] args) {
		
		SpringApplication.run(GestionComptesApplication.class, args);
		
	}
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		// test partie DAO : creation d'un client, un compte et une opération
		Date date = new Date();
		
		Client cli1 = (Client) accountService.saveProfil(new Client("Ahmed","ahmed@ahmed.com","Ahmedreal", "1234",date,null));
		Client cli2 = (Client)accountService.saveProfil(new Client("Oumayma","oumayma@oumayma.com","Oumy", "1234",date,null));
		accountService.saveProfil(new Client("Ahmed","ahmed@ahmed.com","Ahmed_adm", "1234",date,null));
		accountService.saveRole(new AppRole("ADMIN"));
		accountService.saveRole(new AppRole("USER"));
		accountService.addRoleToProfil("Ahmedreal","USER");
		accountService.addRoleToProfil("Oumy","USER");
		accountService.addRoleToProfil("Ahmed_adm","ADMIN");
		
		Compte cpt1 = compteRepository.save(new Compte("Cpt_Ahmed_1", date , 90000, cli1));
		Compte cpt2 = compteRepository.save(new Compte("Cpt_Ahmed_2", date , 90000, cli1));
		Compte cpt3 = compteRepository.save(new Compte("Cpt_Oumayma_1", date , 90000, cli2));
		//Compte cpt3 = compteRepository.save(new Compte("Cpt_Ahmed_3", null , 90000, null));
		operationRepository.save(new Versement(date,500,cpt1));
		operationRepository.save(new Retrait(date,1000,cpt2));
			
	}
}
