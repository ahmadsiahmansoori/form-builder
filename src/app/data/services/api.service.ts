import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private HttpClient: HttpClient) { }


  test() {

    const headers = new HttpHeaders()
    .set('Authorization'   , 'Bearer d2hzlJzeb5FbuSU56HZzvZmXjF6yPy2G')
    .set('contractid', '322')

    return this.HttpClient.get<any>('https://darman-admin.alborzinsurance.ir/api/invoice/599198?expand=icType,invoiceItems', {headers: headers})
  }
}
