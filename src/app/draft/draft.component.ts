import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent {


  router = inject(Router)

  //create property
  draftItems: any[] = []
  draftAllItems: any[] = []
  total: number = 0;


  ngOnInit(): void {
    const draft = JSON.parse(localStorage.getItem("draftLocal")!)
    if (draft != undefined || draft != null) {
      this.draftAllItems.push(...draft)

    }
  }

  //removeDraft

  removeDraft(index: number): void {
    this.draftAllItems.splice(index, 1)
    localStorage.setItem("draftLocal", JSON.stringify(this.draftAllItems));
  }
  removeDraft1(index: any): any {
    this.draftAllItems.splice(index);
    localStorage.setItem("draftLocal", JSON.stringify(this.draftAllItems));
  }

  // moveCart

  moveCart(draftItem: any): void {
    this.router.navigate(['pos/accessories/products'], { state: { drafts: draftItem } })
  }

  //back

  back(): void {
    this.router.navigateByUrl('pos/accessories/products')
  }

}
