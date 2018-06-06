package org.sid.entities;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("VER")
public class Versement extends Operation{

	public Versement() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Versement(Date dateOperation, double montant, String details, Compte compte) {
		super(dateOperation, montant, details, compte);
		// TODO Auto-generated constructor stub
	}

}
