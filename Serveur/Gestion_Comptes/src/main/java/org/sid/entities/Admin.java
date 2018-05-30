package org.sid.entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("A")
public class Admin extends Profile {

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String nom, String email, String userName, String password, Date dateCreation,
			Collection<AppRole> roles) {
		super(nom, email, userName, password, dateCreation, roles);
		// TODO Auto-generated constructor stub
	}



	
}
