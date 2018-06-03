package org.sid.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE",discriminatorType=DiscriminatorType.STRING, length=3)
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class Operation implements Serializable{
	@Id @GeneratedValue
	private Long numero;
	//@JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateOperation;
	private double montant;
	@ManyToOne
	@JoinColumn(name="CODE_COMPTE")
	private Compte compte;
	
	@Transient
	public String getDiscriminatorValue(){
	    DiscriminatorValue val = this.getClass().getAnnotation( DiscriminatorValue.class );
	    if ("V".equals(val.value())) {
	    	return "Versement";
	    }else if("R".equals(val.value())){
	    	return "Retrait";
	    }else {
	    	return val == null ? null : val.value();
	    }
	}
	
	public Operation(Date dateOperation, double montant, Compte compte) {
		super();
		this.dateOperation = dateOperation;
		this.montant = montant;
		this.compte = compte;
	}
	public Operation() {
		super();
	}
	
	public Long getNumero() {
		return numero;
	}
	public void setNumero(Long numero) {
		this.numero = numero;
	}
	public Date getDateOperation() {
		return dateOperation;
	}
	public void setDateOperation(Date dateOperation) {
		this.dateOperation = dateOperation;
	}
	public double getMontant() {
		return montant;
	}
	public void setMontant(double montant) {
		this.montant = montant;
	}

	//@JsonIgnore
	public Compte getCompte() {
		return compte;
	}
	public void setCompte(Compte compte) {
		this.compte = compte;
	}
	
	
}
