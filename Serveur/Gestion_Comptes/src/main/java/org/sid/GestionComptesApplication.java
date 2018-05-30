package org.sid;

import java.util.ArrayList;
import java.util.Collection;
import java.sql.Date;

import javax.persistence.EntityManager;

import org.sid.dao.CompteRepository;
import org.sid.dao.OperationRepository;
import org.sid.dao.ProfileRepository;
import org.sid.dao.RoleRepository;
import org.sid.entities.Admin;
import org.sid.entities.AppRole;
import org.sid.entities.Client;
import org.sid.entities.Compte;
import org.sid.entities.Retrait;
import org.sid.entities.Versement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

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
	
	public static void main(String[] args) {
		
		SpringApplication.run(GestionComptesApplication.class, args);
		
	}
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		// test partie DAO : creation d'un client, un compte et une opération
		Date date = new Date(0);
		AppRole role1 = roleRepository.save(new AppRole("ADMIN"));
		AppRole role2 = roleRepository.save(new AppRole("USER"));
		Collection<AppRole> roles1 = new ArrayList<>();
		Collection<AppRole> roles2 = new ArrayList<>();
		roles1.add(role1);
		roles2.add(role1);
		roles2.add(role2);
		
		Client cli1 = profileRepository.save(new Client("Ahmed","ahmed@ahmed.com","Ahmedreal", "1234",null,roles1));
		Client cli2 = profileRepository.save(new Client("Oumayma","oumayma@oumayma.com","Oumy", "1234",null,roles1));
		profileRepository.save(new Admin("Ahmed", "ahmed@ahmed.com", "Ahmed_Adm", "1234", null,roles2));
		
		Compte cpt1 = compteRepository.save(new Compte("Cpt_Ahmed_1", null , 90000, cli1));
		Compte cpt2 = compteRepository.save(new Compte("Cpt_Ahmed_2", null , 90000, null));
		Compte cpt3 = compteRepository.save(new Compte("Cpt_Ahmed_3", null , 90000, null));
		operationRepository.save(new Versement(null,500,cpt1));
		operationRepository.save(new Retrait(null,1000,cpt2));
			
	}
}
