import { Routes } from '@angular/router';
import { JewelleryListComponent } from './jewellery-list/jewellery-list.component';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { DraftComponent } from './draft/draft.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'products/pos', component: JewelleryListComponent },
    { path: 'pos/accessories/products', component: PosComponent },
    { path: 'pos/accessories/draft', component: DraftComponent },
    { path: 'pos/invoice/add', component: InvoiceComponent },
];
