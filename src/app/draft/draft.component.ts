import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PosComponent } from '../pos/pos.component';

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent {

  //inject
  router = inject(Router)


  //create property
  draftItems: any[] = []
  draftAllItems: any[] = []

  // ngOnInit(): void {
  //   const draft = JSON.parse(localStorage.getItem("CartsLocal")!)
  //   console.log(draft);
  //   this.draftItems = draft
  // }

  ngOnInit(): void {
    const drafts: any[] = JSON.parse(localStorage.getItem("CartsLocal")!) || [];
    this.draftItems.push(...drafts);
  }




  //removeDraft

  removeDraft(index: any): any {
    this.draftItems.splice(index);
    localStorage.setItem("CartsLocal", JSON.stringify(this.draftItems));
  }
  removeItems(index: any): any {
    this.draftItems.splice(index, 1);
    localStorage.setItem("CartsLocal", JSON.stringify(this.draftItems));
  }

  //moveInvoice

  moveInvoice(): void {
    // this.router.navigateByUrl('pos/accessories/products')
    this.router.navigateByUrl('pos/invoice/add')
    localStorage.setItem("draftItems", JSON.stringify(this.draftItems));
  }

  //back

  back(): void {
    this.router.navigateByUrl('pos/accessories/products')
  }


}
