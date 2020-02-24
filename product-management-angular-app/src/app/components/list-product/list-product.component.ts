import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  //creating an array of product class
  p:number =1;
  products: Product[];
  
  searchText: any;
  constructor(private router: Router,
    private productService: ProductService, private authService: AuthService) { }

    ngOnInit() {
      // if (localStorage.getItem("username") != null) {
        this.productService.getProducts()
          .subscribe(data => {
            this.products = data;
          }, err => {
            // on reject
            console.log(err.stack);
          });
      // }
      // else {
      //   this.router.navigate(['/login']);
      // }
          
        }
  
  //logOff User
  logOutUser(){
   this.authService.logOut();
  alert("Logged out!")
  this.router.navigate(['home'])
}

//end of logOff User

  //Delete Product
  deleteProduct(product: Product): void {
    // let result = confirm("Do you want to delete product?");
    // if (result) {
    //   this.productService.deleteProduct(product.id)
    //     .subscribe(data => {
    //       this.products = this.products.filter
    //         (u => u !== product);
    //     })
    //   alert(`${product.productName} record is deleted ..!`);

    // }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(product._id)
        .subscribe(data => {
          this.products = this.products.filter
            (u => u !== product);
        })
        Swal.fire(
          'Deleted!',
          `${product.productName} record is deleted ..!`,
          'success'
        )
      }
    })
  } 

  // Modify Product
  editProduct(product: Product): void {
    console.log("Edit")
    this.router.navigate(['edit-product' , product._id]);
  }

  // Add New Product
  addProduct(): void {
    this.router.navigate(['add-product']);
  }

  isAdmin(): boolean {
    if(localStorage.getItem('username')==="admin@gmail.com")
      return true;
    return false;
  }

  isCandidate(): boolean {
    if(this.authService.loggedIn())
      return true;
    return false;
  }

}

