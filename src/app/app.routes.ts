import { Routes } from '@angular/router';
import { JewelleryListComponent } from './jewellery-list/jewellery-list.component';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { DraftComponent } from './draft/draft.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { resloveGuard } from './guard/reslove.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'products/pos', component: JewelleryListComponent },
    { path: 'pos/accessories/products', component: PosComponent, resolve: { courses: resloveGuard } },
    { path: 'pos/accessories/draft', component: DraftComponent, resolve: { courses: resloveGuard } },
    { path: 'pos/invoice/add', component: InvoiceComponent, resolve: { courses: resloveGuard } },
];
