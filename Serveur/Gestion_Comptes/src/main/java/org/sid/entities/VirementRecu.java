package org.sid.entities;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("VRE")
public class VirementRecu extends Operation{
	
	private String codeCompteTiers;

	public String getCodeCompteTiers() {
		return codeCompteTiers;
	}

	
	public VirementRecu() {
		super();
		// TODO Auto-generated constructor stub
	}


	public VirementRecu(Date dateOperation, double montant, Compte compte, String codeCompteTiers) {
		super(dateOperation, montant, compte);
		this.codeCompteTiers = codeCompteTiers;
	}


	public void setCodeCompteTiers(String codeCompteTiers) {
		this.codeCompteTiers = codeCompteTiers;
	}
	

}
