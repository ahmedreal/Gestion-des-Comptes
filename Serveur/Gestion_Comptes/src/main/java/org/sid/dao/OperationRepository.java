package org.sid.dao;

import java.util.List;

import org.sid.entities.Compte;
import org.sid.entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OperationRepository extends JpaRepository<Operation, Long>{

	//@Query("select operation from Operation where compte = :compte")
	public List<Operation> findByCompte(Compte compte);
}
