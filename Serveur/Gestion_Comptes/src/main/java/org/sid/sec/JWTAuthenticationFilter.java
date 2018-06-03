package org.sid.sec;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sid.entities.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private AuthenticationManager authenticationManager;
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		Profile profil=null;
		
		try {
			//on désirialise les données de la request qui sont en format Json c'est pour cela on utilise la méthode readValue de ObjectMapper
 			profil = new ObjectMapper().readValue(request.getInputStream(), Profile.class);
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		}
		
		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(profil.getusername(), profil.getPassword()));
	}
	
	//cette méthode permet de génrer le Token
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		// ici on récupère le profil connecté
		User userSpring = (User) authResult.getPrincipal();

		// on génére le token en lui passant le subject = username, la date d'expiration, les roles ainsi que le secret 
		String jwt = Jwts.builder()
				.setSubject(userSpring.getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstantes.EXPIRATION_TIME))
				.claim("roles",userSpring.getAuthorities())
				.signWith(SignatureAlgorithm.HS256, SecurityConstantes.SECRET)
				.compact();

		// on ajoute le token au header de la reponse
		response.addHeader(SecurityConstantes.HEADER_STRING, SecurityConstantes.TOKEN_PREFIX+jwt);

	}
}
