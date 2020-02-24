import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registerForm: FormGroup;

  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name:['', Validators.required],
      username:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onRegisterSubmit() {
    this.submitted = true;

    // console.log(this.name);
    if (this.registerForm.invalid) {
      return;
    }
    let user = {
      name: this.registerForm.controls.name.value,
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }

    console.log(user.name);
    this.authService.registerUser(user)
      .subscribe(data => {
        alert('User registered');
        console.log(data);
        this.router.navigate(['/login']);
      },
        err => {
          alert('Some Error Occured');
          console.log(err.stack);
          this.router.navigate(['/register']);
        }
      )
  }
}
