package org.sid.dao;

import org.sid.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompteRepository extends JpaRepository<Compte, String>{
	
}
