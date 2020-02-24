import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = "WELCOME to WALMART";
  //json data

  // json data
  // cust = {
  //   "id": 1,
  //   "productId": 10,
  //   "productName": "Scissors",
  //   "description": "Use this to cut stuff",
  //   "quantity": 10,
  //   "price": 6.99,
  //   "customerName": "Amit",
  //   "address": "pune",
  //   "mobileNumber": 7004502005
  
  // };

  ngOnInit() {
  
  }
}

