package org.sid.web;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.sid.dao.AdminRepository;
import org.sid.dao.ClientRepository;
import org.sid.dao.ProfileRepository;
import org.sid.dao.RoleRepository;
import org.sid.entities.Admin;
import org.sid.entities.AppRole;
import org.sid.entities.Client;
import org.sid.entities.Profile;
import org.sid.service.AccountService;
import org.sid.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
@RequestMapping(path="/api/profiles")
public class ProfileController {
	@Autowired
	ProfileRepository profileRepository;
	@Autowired
	ClientRepository clientRepository;
	@Autowired
	AdminRepository adminRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	AccountServiceImpl accountService;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping(path="/edit")
	public Profile editClient(@RequestBody Profile profil) {
		//return accountService.saveProfil(profile);
		Profile p = profileRepository.findByUsername(profil.getusername());		
		if(!bCryptPasswordEncoder.matches(profil.getPassword(), p.getPassword())) {
			String hashPW = bCryptPasswordEncoder.encode(profil.getPassword());
			p.setPassword(hashPW);
		} 
		p.setEmail(profil.getEmail());
		return profileRepository.findByUsername(p.getusername());
	}
	
	@GetMapping("/")
	public List<Profile> getProfiles() {
		return profileRepository.findAll();
	}
	
	@GetMapping("/username/{username}")
	public Profile getByUsername(@PathVariable("username") String username) {
		return profileRepository.findByUsername(username);
	}
	
	@GetMapping("/{code}")
	public Profile getProfile(@PathVariable("code") long code) {
		return profileRepository.getOne(code);
	}
	

	@GetMapping("/getClients")
	public List<Client> getClients() {
		return clientRepository.findAll();
	}
	
	@GetMapping("/getClient/{code}")
	public Client getClient(@PathVariable("code") long code) {
		return clientRepository.getOne(code);
	}
	
	@GetMapping("/getAdmins")
	public List<Admin> getAdmins() {
		return adminRepository.findAll();
	}
	
	@PostMapping(path="/createClient")
	public Client save(@RequestBody Client client) {
		Profile clt = accountService.saveProfil(new Client(client.getNom(),client.getEmail(),client.getusername(), client.getPassword(),client.getDateCreation(),null));
		AppRole role = roleRepository.findByRoleName("USER");
		Collection<AppRole> roles = new ArrayList<AppRole>();
		roles.add(role);
		clt.setRoles(roles);
		return clientRepository.findByUsername(clt.getusername());
	}
	
	@PostMapping(path="/createAdmin")
	@ResponseStatus(HttpStatus.OK)
	public void save(@RequestBody Admin admin) {
		Profile adm = accountService.saveProfil(new Admin(admin.getNom(),admin.getEmail(),admin.getusername(), admin.getPassword(),admin.getDateCreation(),null));
		AppRole role = roleRepository.findByRoleName("ADMIN");
		Collection<AppRole> roles = new ArrayList<AppRole>();
		roles.add(role);
		adm.setRoles(roles);
	}
	
}
