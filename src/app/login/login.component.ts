import { Component, inject } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  EDService = inject(CommonService)
  activate = inject(ActivatedRoute)
  router = inject(Router)
  matSnackBar = inject(MatSnackBar)

  token: string = ""
  employeeId: string = ""

  userId: string = ""
  Password: string = ""

  image: string | null = null
  signIn(): void {
    const user = {
      "username": this.userId,
      "password": this.Password,
      "inventoryType": "0",
    }
    this.userId = user.username
    this.Password = user.password
    if (this.userId == "admin" && this.Password == "1234") {
      this.EDService.login({ data: this.EDService.encryptData(user) }).subscribe({
        next: (res: any) => {
          const response = this.EDService.decryptData({ data: res })


          localStorage.setItem("token", response.token),
            localStorage.setItem("userId", response.employeeId),
            localStorage.setItem("photo", response.photo),
            this.router.navigateByUrl('products/pos')

          this.matSnackBar.open('Successfully Login', 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000
          })
        }
      });

    }
    else {
      this.matSnackBar.open('Enter the valid data', 'Wrong', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }

  }

}
