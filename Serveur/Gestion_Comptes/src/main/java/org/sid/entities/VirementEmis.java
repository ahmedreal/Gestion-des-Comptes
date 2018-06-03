package org.sid.entities;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("VEM")
public class VirementEmis extends Operation{
	
	private String codeCompteTiers;
	
	
	public VirementEmis() {
		super();
		// TODO Auto-generated constructor stub
	}

	public VirementEmis(Date dateOperation, double montant, Compte compte, String codeCompteTiers) {
		super(dateOperation, montant, compte);
		this.codeCompteTiers = codeCompteTiers;
	}

	public String getCodeCompteTiers() {
		return codeCompteTiers;
	}

	public void setCodeCompteTiers(String codeCompteTiers) {
		this.codeCompteTiers = codeCompteTiers;
	}
	
}
