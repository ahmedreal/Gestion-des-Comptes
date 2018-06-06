import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../../share/models/client.model';
import { Compte } from '../../share/models/compte.model';
import { Router } from '@angular/router';


@Injectable()
export class ClientService {

  public url: string = "http://localhost:8080/api/"; 
  public clients: BehaviorSubject<Client[]> = new BehaviorSubject(null);
  public client: BehaviorSubject<Client> = new BehaviorSubject(null);

  constructor(private http:HttpClient,private router:Router) { }

    getListClients(){
        this.http.get<Client[]>(this.url+"profiles/getClients").subscribe(clients =>{
            this.clients.next(clients);
        });
    }

    getClientComptes(client:Client){
         this.http.get<Compte[]>(this.url+"comptes/clientComptes/"+client.username).subscribe((comptes:Compte[]) =>{
            this.client.next({
              code: client.code,
              nom: client.nom,
              email: client.email,
              username: client.username,
              password: client.password,
              dateCreation: client.dateCreation,
              comptes: comptes
            })
          });
    }

    addCompte(client:Client, code:string,){
        let cpt = new Compte(code,new Date(),0,null,null);
        let client1 = client; 
        client1.comptes = [];
        client1.comptes.push(cpt);
        this.http.post(this.url+"comptes/create",client1).subscribe((compte)=>{
            this.getClientComptes(client);
            this.getListClients();
        });
    }

    addClient(client:Client):Observable<Client>{
        return this.http.post<Client>(this.url+"profiles/createClient",client);
    }

    addAdmin(admin:Client):Observable<Client>{
        return this.http.post<Client>(this.url+"profiles/createAdmin",admin);
    }

    isCompteExists(codeCompte:string):Observable<Compte>{
        return this.http.get<Compte>(this.url+"comptes/"+codeCompte);
    }

}
