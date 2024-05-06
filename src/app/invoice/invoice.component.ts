import { Component, inject } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  //inject
  commonService = inject(CommonService)
  router = inject(Router)
  matSnackBar = inject(MatSnackBar)


  //create property
  invoiceItem: any[] = [];
  draftItems: any[] = []
  total: number = 0;

  customerName: string = ""
  customerId: number = 0
  customerInvoiceName: string = ""
  customerInvoiceId: number = 0

  ngOnInit(): void {
    const invoice = JSON.parse(localStorage.getItem("invoice")!)


    const customer = JSON.parse(localStorage.getItem("customer")!)
    this.customerInvoiceName = customer.name
    this.customerInvoiceId = customer.id

    const amount = JSON.parse(localStorage.getItem("totalAmount")!)


    this.total = amount
    this.invoiceItem = invoice

    const draftItem = JSON.parse(localStorage.getItem('draftItem')!);
    this.customerName = draftItem?.customerName
    this.customerId = draftItem?.customerId


  }
  //removeDraft

  removeDraft(index: number): void {
    this.invoiceItem.splice(index, 1);
    localStorage.setItem("invoiceCart", JSON.stringify(this.invoiceItem));
  }



  //confirmPayment

  confirmPayment(): void {
    if (this.invoiceItem.length === 0) {
      this.matSnackBar.open("Your cart is empty. Please add items before proceeding.", 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      localStorage.removeItem("invoice");
      localStorage.removeItem('draftItem');
      this.router.navigateByUrl('products/pos');
      this.matSnackBar.open("Your order is placed", 'Thank you', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }

  //back

  back(): void {
    this.router.navigateByUrl('pos/accessories/products');
  }
  addInvoice(): void {
    const invoice = {
      "id": 0,
      "discount": 0,
      "cgstAmount": 30,
      "sgstAmount": 26.000000000000004,
      "chitAmount": 0,
      "chitBonus": 0,
      "totalAmount": 2096,
      "chitId": null,
      "returnDiscount": 0,
      "totalMakingCharge": 40,
      "returnItemIds": {
        "RETID": []
      },
      "paymentDetails": [{
        "paymentTypeId": 1,
        "amount": 1000,
        "paymentNotes": "swad",
        "selectedPaymentMethod": {
          "id": 1,
          "name": "cash",
          "details": "cash",
          "createdDate": "2022-05-23T18:30:00.000Z",
          "updatedDate": "2022-05-23T18:30:00.000Z"
        }
      }, {
        "paymentTypeId": 0,
        "amount": null,
        "paymentNotes": ""
      }],
      "oldOrnamentPurchaseId": {
        "OOPID": []
      },
      "exchangeDiscount": 0,
      "paymentType": 1,
      "products": [{
        "id": -1,
        "makingCharge": 2,
        "price": 2000,
        "weight": 2,
        "productId": 18,
        "HUID": "12",
        "quantity": 0,
        "name": "p12",
        "inventoryType": "0",
        "productType": 0
      }],
      "billNotes": "asd",
      "walletAmount": 0,
      "quantity": 0,
      "draftId": -1,
      "deletedProducts": [],
      "type": 0,
      "itemList": [],
      "employeeId": 1,
      "customerId": 2,
      "customerInfoJson": "{\"name\":\"mushari\",\"id\":2,\"phone\":\"+919987678987\",\"address\":\"meaklas street,kariakal,karaikal,India,610009\"}"
    }
    this.commonService.pos({ data: this.commonService.encryptData(invoice) }).subscribe({
      next: (res: any) => {
        const response = this.commonService.decryptData({ data: res })
      }
    });
  }

}
