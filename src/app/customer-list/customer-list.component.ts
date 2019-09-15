import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers:ICustomer[]=[];
  DublinLatitude:number=53.339428;
  DublinLongitude:number=-6.257664;
  customerObj={};
  sortedCustomers=[];

  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(data => {
        this.customers=data;
        });
  
      }

    degreeToRad(val){
      return val * Math.PI / 180;
    }

    distance(lat:number,lon:number){
      var R = 6371; 
      var dLat = this.degreeToRad(this.DublinLatitude-lat);
      var dLon = this.degreeToRad(this.DublinLongitude-lon)
      var lat1 = this.degreeToRad(this.DublinLatitude);
      var lat = this.degreeToRad(lat);
    
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c;
          return d;
    }


    searchCustomer(){
      this.sortedCustomers=[];
     for (let i=0; i<this.customers.length; i++){
      var tempDist= this.distance(parseFloat(this.customers[i].latitude), parseFloat(this.customers[i].longitude))
       if(tempDist < 100){
         
        this.customerObj={
           name:this.customers[i].name,
           user_id:this.customers[i].user_id
         }
   
         this.sortedCustomers.push(this.customerObj);
        
       }
      }
    
     this.sortedCustomers.sort( function(a,b){
       return a.user_id-b.user_id;
   })
        return this.sortedCustomers;
   
   }
   
}
