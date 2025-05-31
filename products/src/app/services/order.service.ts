import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Order} from '../models/order.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore:Firestore) {}

  addOrder(order: Order){
    const ref = collection(this.firestore, 'orders');
    return addDoc(ref, order);
  }

  getOrders():Observable<Order[]>{
    const ref = collection(this.firestore, 'orders');
    return collectionData(ref, {idField: 'id'}) as Observable<Order[]>;
  }

  deleteOrder(order: Order){
    const ref = doc(this.firestore, `orders/${order.id}`)
    return deleteDoc(ref);
  }

  getOrderById(id: string){
    const ref = doc(this.firestore, `orders/${id}`);
    return docData(ref, {idField: 'id'}) as Observable<Order>;
  }

  updateOrder(order: Order){
    const ref = doc(this.firestore, `orders/${order.id}`)
    return setDoc(ref,order);
  }

}
