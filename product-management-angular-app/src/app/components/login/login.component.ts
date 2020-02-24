import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
 

  
  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


  }


  onSubmit() {
    this.submitted = true;
   
    if (this.loginForm.invalid) {
      return;
    }
    let user = { email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }

    let username
      = this.loginForm.controls.email.value;
    let password
      = this.loginForm.controls.password.value;

    if (username
      === "admin@gmail.com" &&
      password === "Hello121") {
      console.log(username);
      localStorage.setItem("username", username);
      // localStorage.setItem("password", password);
      this.router.navigate(['/list-product']);
    }
    else {
      this.authService.login(user)
      .subscribe(data => {
        if(data.success ==false){return alert("Please register urself")};
          
        
        console.log(data);
        this.router.navigate(['/list-product']);
      },
        err => {
          console.log(err.stack);
          alert('User not found');
          this.router.navigate(['/login']);
        });
    }
    
  
 

    // If validation failed, it should return 
    // to Validate again
    
    
  }
}
  
  
