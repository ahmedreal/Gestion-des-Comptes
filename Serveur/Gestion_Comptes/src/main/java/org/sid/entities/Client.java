package org.sid.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@DiscriminatorValue("C")
public class Client extends Profile{

	@OneToMany(mappedBy="client")
	private Collection<Compte> comptes = new ArrayList<>();


	//@JsonIgnore
	public Collection<Compte> getComptes() {
		return comptes;
	}

	public void setComptes(Collection<Compte> comptes) {
		this.comptes = comptes;
	}
	
	public Client() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Client(String nom, String email, String userName, String password, Date dateCreation,
			Collection<AppRole> roles) {
		super(nom, email, userName, password, dateCreation, roles);
		// TODO Auto-generated constructor stub
	}

}
