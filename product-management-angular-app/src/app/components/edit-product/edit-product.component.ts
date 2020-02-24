import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean = false;

  product: Product;
  productId: number;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService) {
    this.route.params.subscribe
      (params => {
        this.productId = params['id'];

      });

  }

  // LogOff User
  logOutUser() {
    // if (localStorage.getItem("username") != null) {
    //   localStorage.removeItem("username");
    //   this.router.navigate(['/login']);
    // }
    this.authService.logOut();
    alert("Lgged out!")
    this.router.navigate(['home'])
  }

  ngOnInit() {
    // if (localStorage.getItem("username") != null) {

    if (this.productId != null) {
      if (!this.productId) {
        alert('Invalid Action');
        this.router.navigate(['list-product']);
        return;
      }
      this.editForm = this.formBuilder.group({
        _id: [this.productId],
        productId: ['', Validators.required],
        productName: ['', Validators.required],
        description: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required],
        customerName: ['', Validators.required],
        address: ['', Validators.required],
        mobileNumber: ['', Validators.required]
      });

      this.productService.getProductsById(this.productId)
        .subscribe(data => {
          this.editForm.setValue(data)
          console.log(data);
        });
    }


  }

  onSubmit() {
    console.log("hi")
    this.submitted = true;
    console.log("in update");
    if (this.editForm.invalid) {
      console.log("in update");
      return;
    }
    this.productService.updateProduct(this.editForm.getRawValue()).subscribe(data => {
      this.router.navigate(['list-product']);
    }, error => {
      console.log(error.stack);
    });
  }
} 
