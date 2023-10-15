import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceDTO } from '../models/invoice-dto';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoiceList: InvoiceDTO[] = [];
  displayedColumns = ['billTo','invoiceNo', 'invoiceDate', 'dueDate'];

  totalRecords: number = 50;
  pageIndex = 1;
  pageSize =3;

  constructor(private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(){
    this.invoiceService.getInvoice(this.pageIndex, this.pageSize).subscribe( data => {
      //if(data.body != undefined || data.body != null){
        this.invoiceList = data ;
      //}
      console.log(this.invoiceList);
      this.totalRecords = data[0].totalRecords;
      //console.log(data.headers.get('X-Pagination'));
    });
  }

  AddInvoice(){
    this.router.navigate(['/add']);
  }

  handlePageEvent(value: PageEvent){
    this.pageIndex = value.pageIndex + 1;
    this.getInvoice();
  }
}
