import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AES } from 'crypto-js';
import * as CryptoJs from 'crypto-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { routes } from '../app.routes';
import { ROUTES, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  http = inject(HttpClient)

  router = inject(Router)


  encryptData(value: any) {
    return AES.encrypt(
      JSON.stringify(value), environment.SECRETKEY
    ).toString();
  }

  decryptData(value: any) {
    return JSON.parse(
      AES.decrypt(value.data, environment.SECRETKEY)
        .toString(CryptoJs.enc.Utf8)
    )
  }

  login(req: any): Observable<any> {
    return this.http.post('/login', req);
  }
  list(req: any): Observable<any> {
    return this.http.post('products/pos', req)
  }
  metalTypes(req: any): Observable<any> {
    return this.http.post('metalTypes', req)
  }
  categories(req: any): Observable<any> {
    return this.http.post('categories', req)
  }

  //pos

  pos(req: any): Observable<any> {
    return this.http.post('pos/accessories/products', req)
  }


  invoice(req: any): Observable<any> {
    return this.http.post('invoice/add', req)
  }

  constructor() { }

}

