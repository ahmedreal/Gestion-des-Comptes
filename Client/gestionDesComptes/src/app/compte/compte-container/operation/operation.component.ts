import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { OperationService } from '../../operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit, OnDestroy {

  public isVir: boolean = false;
  public opForm:FormGroup;
  public montant = 0;
  public operation:Operation;
  public compte:Compte;
  public erreur:string;
  public sup:Subscription;

  @Input() listCodeComptes:string[];

  constructor(private fb:FormBuilder, private opService:OperationService) { }

  ngOnInit() {
    this.sup =this.opService.compte.subscribe(compte => {
      this.compte = compte;
      this.opForm = this.fb.group({
        code:[this.compte.codeCompte,Validators.required],
        operation:['VERS',Validators.required],
        compteDist:[''],
        montant:[this.montant,Validators.min(1)]
      }); 
      this.isVir = false;
    })
  }

  afficheVers(val){
    if(val.value==='VIR'){
      this.isVir = true;
    }else{
      this.isVir = false;
    }
  }

  sendOp(){
    let compteDistValid = this.listCodeComptes.includes(this.opForm.get('compteDist').value);
    if(!compteDistValid && this.opForm.get('operation').value === 'VIR'){
      this.erreur = 'Compte Invalid!';
    }else if(this.opForm.get('montant').value < 1){
      this.erreur = 'Le montant doit être supérieur à 1!';
    }else{
      let date = new Date();
      this.erreur = this.opService.doOperation(date,this.opForm.value.montant,this.compte, this.opForm.value.compteDist, this.opForm.value.operation);
      this.opForm.patchValue({
        montant: this.montant,
        compteDist:''
      });
    }  
  }

  ngOnDestroy(){
    if(this.sup)
      this.sup.unsubscribe;
  }

}
