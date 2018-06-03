package org.sid.dao;

import java.util.List;

import org.sid.entities.Client;
import org.sid.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, String>{

	public List<Compte> findByClient(Client client);
}
