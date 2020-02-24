// Step7: Creating Product Service

import { Injectable } from '@angular/core';
// using HttpClient Service
// for making use of Http Verbs or methods
// for performing CRUD operations on
// backend service [json-server/express]
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Service Dependency Injection - injecting built in 
  // http service inside constructor
  constructor(private http: HttpClient) { }

  // baseUrl: string = "http://localhost:3002/products";
  baseUrl: string = "http://localhost:3000/api/products";

  // Get All Products
  getProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }
 
  getProductsById(id: number) {
    return this.http.get<Product>(this.baseUrl + "/" + id);
  }
  // Add product
  createProduct(product: Product) {
    return this.http.post(this.baseUrl, product);
  }
  // Modify product
  updateProduct(product: Product) {
    return this.http.put(this.baseUrl + "/" + product._id,
      product);
  }
  // Delete Products By Id
  
  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
} 
