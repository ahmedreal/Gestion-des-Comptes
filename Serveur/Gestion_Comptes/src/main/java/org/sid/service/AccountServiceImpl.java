package org.sid.service;

import org.sid.dao.ProfileRepository;
import org.sid.dao.RoleRepository;
import org.sid.entities.AppRole;
import org.sid.entities.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService{

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private ProfileRepository profileRepository;
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public Profile saveProfil(Profile p) {
		String hashPW = bCryptPasswordEncoder.encode(p.getPassword());
		p.setPassword(hashPW);
		return profileRepository.save(p);
	}

	@Override
	public AppRole saveRole(AppRole r) {
		return roleRepository.save(r);
	}

	@Override
	public void addRoleToProfil(String username, String roleName) {
		AppRole role = roleRepository.findByRoleName(roleName);
		Profile profil = profileRepository.findByUsername(username);
		profil.getRoles().add(role);
	}

	@Override
	public Profile findUserByUserName(String username) {
		return profileRepository.findByUsername(username);
	}

}
