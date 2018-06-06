import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../share/models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { SharedService } from '../../../share/service/shared.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  public addForm:FormGroup;
  passwordConf:string;
  erreur:string;
  message:string;
  typeProfil:string;
  constructor(private fb:FormBuilder,private sharedService:SharedService, private clientService:ClientService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.typeProfil = this.activatedRoute.snapshot.queryParamMap.get('type');

    this.addForm = this.fb.group({
      nom : ['',Validators.required],
      email:['', Validators.required],
      username :['',Validators.required],
      password :['', Validators.required],
      dateCreation : '',
      passwordConf:['',Validators.required]
    });
  }

  addProfil(){
    let newProfil= {
      code: null,
      nom: this.addForm.get('nom').value,
      email: this.addForm.get('email').value,
      username: this.addForm.get('username').value,
      password: this.addForm.get('password').value,
      dateCreation:new  Date(),
      comptes: null
    };
    if(this.typeProfil ==='Client'){
      this.clientService.addClient(newProfil).subscribe((client)=>{
        this.clientService.getListClients();
        this.message="Client crée";
      });
    }else if(this.typeProfil ==='Administrateur'){
      this.clientService.addAdmin(newProfil).subscribe((client)=>{
        this.clientService.getListClients();
        this.message="Administrateur crée";
      });
    }
    this.addForm.reset();
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }


  confirmPassword(){
    this.erreur = this.sharedService.isPasswordConfirmed(this.addForm.get('password').value, this.addForm.get('passwordConf').value);
  }

  canAdd():boolean{
    if(this.addForm.valid && !this.erreur){
      return true
    }else{
      return false
    }
  }

}
