import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent {
  //inject
  commonService = inject(CommonService)
  posList: any;
  search: string | undefined = "";
  router = inject(Router)
  matSnackBar = inject(MatSnackBar)


  //create property
  orderNumber: Number | null = null
  totalAmount: number = 0
  draftItems: any[] = []

  ngOnInit(): void {
    this.pos()
    this.categories()
    this.addInvoice()

    //generate Random Number
    let order = Math.floor(Math.random() * 90000) + 1000;
    this.orderNumber = order

    //draftItems
    const draftItem = JSON.parse(localStorage.getItem("draftItems") || '[]');
    console.log(draftItem);

    this.draftItems = draftItem
  }

  pos(): void {
    const pos = {
      "search": this.search,
      "categoryId": this.categoryId,
      "inventoryType": 0,
      "employeeId": 1
    }
    this.commonService.pos({ data: this.commonService.encryptData(pos) }).subscribe({
      next: (res: any) => {
        const response = this.commonService.decryptData({ data: res })
        this.posList = response
      }
    });

  }

  //search
  searchMethod(event: any): void {
    this.search = (event.target as HTMLInputElement).value
    console.log(this.search);
    this.pos()
  }

  //back

  back(): void {
    this.router.navigateByUrl('products/pos')
  }

  //filter

  categoryId: any = -1;
  categoryType: any = null;

  categories(): void {
    const pos = {
      "search": this.search,
      "categoryId": this.categoryId,
      "inventoryType": 0,
      "employeeId": 1
    }
    this.commonService.categories({ data: this.commonService.encryptData(pos) }).subscribe({
      next: (res: any) => {
        const response = this.commonService.decryptData({ data: res })
        this.categoryType = response
      }
    });
  }

  filterProduct(categories: string) {
    this.categoryId = categories
    this.pos()
  }

  //add to cart
  carts: any[] = []

  //totalAmount

  amount() {
    localStorage.setItem("totalAmount", JSON.stringify(this.totalAmount));
    return this.carts.reduce((acc, item) => {
      return this.totalAmount = acc + item.rate * item.quantity
    }, 0)
  }

  addCart(pos: any): void {

    const ItemIndex = this.carts.findIndex(item => item === pos);

    if (ItemIndex !== -1) {
      if (this.carts[ItemIndex].quantity < 10) {
        this.carts[ItemIndex].quantity++;
      } else {
        this.matSnackBar.open('Maximum quantity reached for this item.', 'Cart is full', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
      }
    } else {
      if (this.carts.length < 10) {
        pos.quantity;
        this.carts.push(pos);
      } else {
        this.matSnackBar.open('Maximum items reached in the cart.', 'Cart is full', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
      }
    }


  }




  increaseQuantity(index: number): void {
    if (this.carts[index].quantity < 10) {
      this.carts[index].quantity++;
    }
    else {
      this.matSnackBar.open('Maximum items reached in the cart.', 'Cart is full', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }


  decreaseQuantity(index: number): void {
    const item = this.carts[index];
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.carts.splice(index, 1);
    }
  }

  removeCart(index: number): void {
    this.carts.splice(index, 1);
    localStorage.setItem("CartsLocal", JSON.stringify(this.carts));
  }



  //draft
  draft(): void {
    const localGet = JSON.parse(localStorage.getItem("CartsLocal") || '[]');

    const pushItems = [...localGet, ...this.carts];

    localStorage.setItem("CartsLocal", JSON.stringify(pushItems));
    if (this.carts.length > 0) {
      this.router.navigateByUrl('pos/accessories/draft')
      this.matSnackBar.open("successfully added to draft.", 'success', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    } else {
      this.router.navigateByUrl('pos/accessories/draft')
      this.matSnackBar.open("No items in the cart.", 'No items added', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }

  removeDraft(index: number): void {
    this.carts.splice(index, 1);
    localStorage.setItem("draftItems", JSON.stringify(this.draftItems));
  }

  //invoice

  addInvoice(): void {
    const invoice = {
      "id": 0,
      "discount": 0,
      "cgstAmount": 30,
      "sgstAmount": 26.000000000000004,
      "chitAmount": 0,
      "chitBonus": 0,
      "totalAmount": 0,
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

  invoice(): void {
    localStorage.setItem("invoice", JSON.stringify(this.carts));
    if (this.carts.length > 0) {
      this.router.navigateByUrl('pos/invoice/add');
      this.addInvoice();
    } else {
      this.matSnackBar.open("No items in the cart. Cannot proceed to invoice.", 'No items', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }

}
