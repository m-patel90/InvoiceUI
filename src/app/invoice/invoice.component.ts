import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Invoice} from 'src/app/models/invoice'
import { InvoiceDetails } from '../models/invoice-details';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  myfrom!: FormGroup;
  customerList : string[] = ['maulik', 'kinjal'];
  statuslist : string[] = ["draft", "saved"];
  invoiceDetailsList : InvoiceDetails[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.myfrom = new FormGroup({
      BillTo: new FormControl(""),
      InvoiceNo: new FormControl(),
      InvoiceDate: new FormControl(),
      DueDate: new FormControl(),
      Status: new FormControl()
    });
  }
 
  dateChangeHandler(data : Event){
    alert(this.myfrom.get('duedate')!);
  }

  selectCustomer(cust: string){
    this.myfrom.controls['customer'].setValue(cust);
  }

  saveInvoice(){
    this.myfrom.get('duedate')
    
    var invoiceDetails: InvoiceDetails = {
      Id :"0",
      InvoiceInfoId: "0",
      ProductName: "xyz",
      Description: "desc",
      Price: 1000,
      Qunatity: 1,
      Tax: 10,
      Total: 1010,
      SubTotal: 1010,
      TotalTax: 10,
      GrandTotal: 1010,
      InvoiceNote: "invoice note"
    };

    
    
    this.invoiceDetailsList.push(invoiceDetails);

    var invoicedata : Invoice = { 
      id : "0",
      billTo : "1", //this.myfrom.get('BillTo')?.value,
      invoiceNo : this.myfrom.get('InvoiceNo')?.value,
      invoiceDate: this.myfrom.get('InvoiceDate')?.value,
      dueDate: this.myfrom.get('DueDate')?.value,
      status: this.myfrom.get('Status')?.value,
      createdDate: new Date(),
      invoiceDetails: this.invoiceDetailsList,
      totalRecords:0
    }
    this.invoiceService.saveInvoice(invoicedata).subscribe(data =>{
      console.log("Invoice saved successful");
    });
  }
}
