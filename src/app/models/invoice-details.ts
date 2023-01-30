export interface InvoiceDetails {
    Id: string;
    InvoiceInfoId: string,
    ProductName: string,
    Description: string,
    Price: number,
    Qunatity: number,
    Tax: number,
    Total: number,
    SubTotal: number,
    TotalTax: number,
    GrandTotal: number,
    InvoiceNote: string
}
