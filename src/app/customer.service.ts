import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ICustomer } from './customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _url:string="/assets/data/customer.json"
  
  constructor(private _http:HttpClient) { }

 getCustomer():Observable<ICustomer[]>{
   return this._http.get<ICustomer[]>(this._url);
 }


}
