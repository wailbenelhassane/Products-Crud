import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Client} from '../models/client.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) {}

  addClient(client: Client){
    const ref = collection(this.firestore, 'clients');
    return addDoc(ref, client);
  }

  getClients(): Observable<Client[]>{
    const ref = collection(this.firestore, 'clients');
    return collectionData(ref, {idField:'id'}) as Observable<Client[]>;
 }

 deleteClient(client: Client){
    const ref = doc(this.firestore, `clients/${client.id}`);
    return deleteDoc(ref);
 }

 getClientById(id: string){
    const ref = doc(this.firestore, `clients/${id}`);
    return docData(ref);
 }

 updateClient(client: Client){
    const ref = doc(this.firestore, `clients/${client.id}`);
    return setDoc(ref, client);
 }
}
