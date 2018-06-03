package org.sid.sec;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//on autorise les request de tout les domaines
		response.addHeader("Access-Control-Allow-Origin", "*");
		// on précise les headers autorisés
		response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-request-Headers, Authorization");
		// on autorise à la partie front-end de lire les entetes ci-dessous
		response.addHeader("Access-Control-Expose-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Credentials , Authorization");
		
		// si la requête est envoyée avec le verbe options on l'accèpte et on retourne les options de communications comme headers autorisés
		if(request.getMethod().equals("OPTIONS")) {
			response.setStatus(HttpServletResponse.SC_OK);
		}else {
			// on récupére le token
			String jwt = request.getHeader(SecurityConstantes.HEADER_STRING);
			// si le token est null ou il ne commence pas par notre prefix on passe au filtre suivant et on sort
			if(jwt==null || !jwt.startsWith(SecurityConstantes.TOKEN_PREFIX)) {
				//on passe au filtre suivant
				filterChain.doFilter(request, response); 
				return;
			}
			//Sinn, on va signer le token on utilise le secret et on supprime le prefix et on met le resultat dans claims
			Claims claims=Jwts.parser()
					.setSigningKey(SecurityConstantes.SECRET)
					.parseClaimsJws(jwt.replaceAll(SecurityConstantes.TOKEN_PREFIX, ""))
					.getBody();
			// ici on récupère le username
			String username = claims.getSubject();
			
			// ici on récupère les roles et on les ajoute dans l'objet granteAuthority utilisé par Spring pour charger le context
			ArrayList<Map<String, String>> roles = (ArrayList<Map<String,String>>) claims.get("roles");
			Collection<GrantedAuthority> authorities = new ArrayList<>();
			roles.forEach(r->{
				authorities.add(new SimpleGrantedAuthority(r.get("authority")));
			});
			
	        // le passwword est null car on ne le passe pas dans le token puisque normalement l'utilisateur est déja authenfié
			UsernamePasswordAuthenticationToken authenticatedUser = new UsernamePasswordAuthenticationToken(username, null, authorities);
			// on charge le context de spring pour accèder par la suite aux controlleurs de notre API  
			SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
			filterChain.doFilter(request, response);
		}
	}

}
