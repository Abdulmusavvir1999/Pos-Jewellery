import { Component, inject } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-jewellery-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, MatSnackBarModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './jewellery-list.component.html',
  styleUrl: './jewellery-list.component.scss'

})
export class JewelleryListComponent {
  commonService = inject(CommonService)

  productList: any[] = []
  router = inject(Router)
  activate = inject(ActivatedRoute)

  matSnackBar = inject(MatSnackBar)

  //Profile
  token: string | null = ""
  userId: string | null = ""
  photo: string | null = ""

  //categories
  categoric: string = ""

  //search
  search: string | null = ""

  dialog = inject(MatDialog)




  ngOnInit(): void {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const photo = localStorage.getItem('photo')
    this.token = token
    this.userId = userId
    this.photo = photo
    this.list()
    this.categories()
  }

  list(): void {
    const user = parseInt(localStorage.getItem('userId')!)
    const products = {
      "search": this.search,
      "categoryId": this.categoryId,
      "subCategoryId": -1,
      "inventoryType": 0,
      "employeeId": user,
    }
    this.commonService.list({ data: this.commonService.encryptData(products) }).subscribe({
      next: (res: any) => {
        const response = this.commonService.decryptData({ data: res })
        this.productList = response
      }
    });


  }

  // categories

  categoryId: any = -1;
  categoryType: any = null;

  categories(): void {
    const categories = {
      "employeeId": 1
    }
    this.commonService.categories({ data: this.commonService.encryptData(categories) }).subscribe({
      next: (res: any) => {
        const response = this.commonService.decryptData({ data: res })
        this.categoryType = response
      }
    });
    this.list()
  }

  filterProduct(event: any) {
    this.categoryId = event
    this.list()
  }

  clearProject(): void {
    this.categoryId = -1;
    this.list()
  }

  //search

  searchMethod(event: any): void {
    this.search = (event.target as HTMLInputElement).value
    this.list()
  }

  //pos 
  pos(): void {
    this.router.navigateByUrl('pos/accessories/products')
  }

  logOut() {
    localStorage.removeItem("token")
    this.router.navigateByUrl('')
    //snack bar message

    this.matSnackBar.open('Successfully Logout', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }



}
