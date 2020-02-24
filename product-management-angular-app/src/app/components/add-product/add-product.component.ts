import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;
  products: Product[];

  // Constructor Dependency injection
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }
  onSubmit() {
    // validations tested here
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    // on successful validations
    console.log(this.addForm.value);
    this.productService.createProduct(this.addForm.value)
      .subscribe(data => 
        {
        alert(this.addForm.controls.productName.value
          + ' record is added successfully ..!');
        this.router.navigate(['list-product']);
        }, err => {
        console.log(err.stack);
      });
  }
}



