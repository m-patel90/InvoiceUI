import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceDTO } from '../models/invoice-dto';
const BASE_URL = 'https://localhost:7013/api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http : HttpClient) { }

  saveInvoice(invoice: any){
    return this.http.post(BASE_URL+'/Invoice/SaveInvoice', invoice);
  }

  getInvoice(pageIndex: number, pagesize: number): Observable<InvoiceDTO[]>{
    return this.http.get<InvoiceDTO[]>(BASE_URL+'/Invoice?PageNumber='+ pageIndex +'&pageSize='+ pagesize +'&orderBy=customer&direction=asc')
  }
}
