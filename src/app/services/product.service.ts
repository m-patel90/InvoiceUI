import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../models/product';
const BASE_URL = 'https://localhost:7013/api';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(BASE_URL+'/product/GetProduct').pipe(
      catchError(err => of([]))
    );
  }
}
