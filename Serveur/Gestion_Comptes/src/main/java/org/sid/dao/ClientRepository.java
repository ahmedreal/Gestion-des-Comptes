package org.sid.dao;

import org.sid.entities.Client;
import org.sid.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long>{
	public Client findByUsername(String username);
}
