import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationService } from '../../../share/service/operation.service';
import { Operation } from '../../../share/models/operation.model';
import { Compte } from '../../../share/models/compte.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  public isVir: boolean = false;
  public opForm:FormGroup;
  public montant = 0;
  public operation:Operation;
  public compte:Compte;
  public erreur:string;
  @Input() codeCompte:string;
  constructor(private fb:FormBuilder, private opService:OperationService) { }

  ngOnInit() {
    this.opService.compte.subscribe(compte => this.compte = compte);
    this.opForm = this.fb.group({
      code:[this.codeCompte,Validators.required],
      operation:['VERS',Validators.required],
      compteDist:'',
      montant:this.montant
    });
  }

  afficheVers(val){
    if(val.value==='VIR'){
      this.isVir = true;
    }else{
      this.isVir = false;
    }
  }

  sendOp(){
      let date = new Date();
      this.erreur = this.opService.doOperation(date,this.opForm.value.montant,this.compte, this.opForm.value.compteDist, this.opForm.value.operation);
      this.opForm.patchValue({
        montant: this.montant
      });;
  }

}
