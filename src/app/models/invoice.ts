import { InvoiceDetails } from "./invoice-details";

export interface Invoice {
    id: string,
    billTo: string,
    invoiceNo: string,
    invoiceDate: Date,
    dueDate: Date,
    status: string,
    createdDate: Date,
    totalRecords: number,
    invoiceDetails: InvoiceDetails[]
}
