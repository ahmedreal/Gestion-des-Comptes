package org.sid.web;

import java.util.List;

import org.sid.dao.AdminRepository;
import org.sid.dao.ClientRepository;
import org.sid.dao.ProfileRepository;
import org.sid.entities.Admin;
import org.sid.entities.Client;
import org.sid.entities.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@PostMapping(path="/save")
	public Profile save(@RequestBody Profile profile) {
		return profileRepository.save(profile);
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
	
}
