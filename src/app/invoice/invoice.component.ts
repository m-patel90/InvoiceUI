import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice} from 'src/app/models/invoice'
import { InvoiceDetails } from '../models/invoice-details';
import { InvoiceService } from '../services/invoice.service';

import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import { InvoiceDetailsVM } from '../models/invoice-details-vm';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  myfrom!: FormGroup;
  customerList = [{ 'Id':1, 'name' : 'maulik' }, {Id: 1, name:'kinjal'}];
  statuslist : string[] = ["draft", "saved"];
  invoiceDetailsList : InvoiceDetails[] = [];
  productList : Product[] = [];

  
  data: InvoiceDetailsVM[] = [ {position:0, ProductName: '',Desc:'',Price:0,Qunatity:0,Tax:0,Total:0, Delete:''} ];
  displayColumns = ['position', 'ProductName', 'Description', 'Price','Qunatity', 'Tax', 'Total', 'Delete'];
   rows: FormArray = this.fb.array([]);
  //deatilsform: FormGroup = this.fb.group( {rows: this.rows });
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  
  index=1;
  constructor(private invoiceService: InvoiceService, 
    private fb: FormBuilder,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.myfrom = new FormGroup({
      BillTo: new FormControl(null, [Validators.required]),
      InvoiceNo: new FormControl(null,[Validators.required]),
      InvoiceDate: new FormControl(new Date(),[Validators.required]),
      DueDate: new FormControl(new Date(),[Validators.required]),
      Status: new FormControl(null,[Validators.required]),
      InvoiceNote: new FormControl(null),
      SubTotal: new FormControl(null),
      TotalTax: new FormControl(null),
      GrandTotal: new FormControl(null),
      Details: this.rows
      // Details: new FormGroup(
      //  { 
      //     rows: this.rows
      //  }
      //)
    });

   this.data.forEach((d: InvoiceDetailsVM) => this.addRow(d, false));
   this.updateView();

   this.getProducts();
  }

  dateChangeHandler(data : Event){
    alert(this.myfrom.get('duedate')!);
    alert(moment(this.myfrom.get('InvoiceDate')?.value));
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    alert("InvoiceDate :" + this.myfrom.get('InvoiceDate')?.value);
  }
  
  selectCustomer(cust: string){
    this.myfrom.controls['customer'].setValue(cust);
  }

  saveInvoice(){
    if(!this.myfrom.valid)
      return;

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
      invoiceDate: moment(this.myfrom.get('InvoiceDate')?.value).toDate(),
      dueDate: moment(this.myfrom.get('DueDate')?.value).toDate(),
      status: this.myfrom.get('Status')?.value,
      createdDate: new Date(),
      invoiceDetails: this.invoiceDetailsList,
      totalRecords:0
    }

    var data = this.myfrom.value;
    this.invoiceService.saveInvoice(data).subscribe(data =>{
      console.log("Invoice saved successful");
      alert("Saved Successfully!!");
    });
  }

  reset(){
    this.myfrom.reset();
  }

  addRow(d?: InvoiceDetailsVM, noUpdate?: boolean) {
    const row = this.fb.group({
      'ProductName': [d && d.ProductName ? d.ProductName : null],
      'Desc':[d && d.Desc ? d.Desc : null],
      'Price': [d && d.Price ? d.Price : 0],
      'Qunatity': [d && d.Qunatity],
      'Tax': [d && d.Tax],
      'Total':[d && d.Total]
    });

    //const control = this.myfrom.get('rows') as FormArray;
    //control.insert(0,this.initiateVOForm());
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {

    //const controls= this.deatilsform.get('rows') as FormArray;
    this.dataSource.next(this.rows.controls);
  }
  
  RemoveRow(index: number) {
    console.log(this.dataSource);
    this.rows.removeAt(index);
    this.updateView();
  }

  //Get Product list
  getProducts(){
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
    });
  }

  // DetailsList(): FormArray {
  //   return this.deatilsform.get('rows') as FormArray;
  // }
}