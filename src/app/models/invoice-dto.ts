import { InvoiceDetails } from "./invoice-details";

export interface InvoiceDTO {
    id: string,
    customer: string,
    invoiceNo: string,
    invoiceDate: Date,
    dueDate: Date,
    status: string,
    totalRecords: number,
    invoiceDetails: InvoiceDetails[]
}
