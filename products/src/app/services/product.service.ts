import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) {}

  addProduct(product: Product){
    const ref = collection(this.firestore, 'products');
    return addDoc(ref, product);
  }

  getProducts(): Observable<Product[]>{
    const ref = collection(this.firestore, 'products');
    return collectionData(ref, {idField:'id'}) as Observable<Product[]>;
  }

  deleteProduct(product: Product){
    const ref = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(ref);
  }

  getProductById(id: string){
    const ref = doc(this.firestore, `products/${id}`);
    return docData(ref);
  }

  updateProduct(product: Product){
    const ref = doc(this.firestore, `products/${product.id}`);
    return setDoc(ref, product);
  }
}
