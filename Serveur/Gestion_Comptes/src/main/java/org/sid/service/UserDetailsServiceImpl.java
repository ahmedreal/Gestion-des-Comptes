package org.sid.service;

import java.util.ArrayList;
import java.util.Collection;

import org.sid.entities.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private AccountService accountService;
	
	// cette méthode permet de récupérer le profil depuis la base 
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// on récupère le profil
		Profile profil = accountService.findUserByUserName(username);

		if(profil == null) throw new UsernameNotFoundException("Username introuvable");
		// on crée une collection de GranteAuhtority et on la remplit avec les roles de mon profil
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		profil.getRoles().forEach(r->{
			authorities.add(new SimpleGrantedAuthority(r.getRoleName()));
		});
		// on instancie et on retourne l'objet User de spring
		return new User(profil.getusername(), profil.getPassword(), authorities);
	}

}
