package org.sid.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE",discriminatorType=DiscriminatorType.STRING, length=1)
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Profile implements Serializable{
	
	@Id @GeneratedValue
	private Long code;
	private String nom;
	private String email;
	@Column(unique=true)
	private String username;
	private String password;
	//@JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateCreation;
	@ManyToMany(fetch=FetchType.EAGER)
	private Collection<AppRole> roles;

	public Profile(String nom, String email, String username, String password, Date dateCreation,
			Collection<AppRole> roles) {
		super();
		this.nom = nom;
		this.email = email;
		this.username = username;
		this.password = password;
		this.dateCreation = dateCreation;
		this.roles = roles;
	}
	
	public Profile(String username, String password, Collection<AppRole> roles) {
		super();
		this.username = username;
		this.password = password;
		this.roles = roles;
	}
	
	public Profile(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	public Profile() {
	}
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getusername() {
		return username;
	}
	public void setusername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Collection<AppRole> getRoles() {
		return roles;
	}
	public void setRoles(Collection<AppRole> roles) {
		this.roles = roles;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}
	
}
