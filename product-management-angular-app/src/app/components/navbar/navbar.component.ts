import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = "Product Management Wing";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    // console.log('checking logged in');
    if(this.authService.loggedIn()) {
      // console.log(1);
      return true;
    }
    else if (localStorage.getItem('username') === "admin@gmail.com") {
      // console.log(2);
      return true;
    }
    // console.log(3);
    return false;    
  }

  logout() {
    if(this.authService.loggedIn()){
      this.authService.logOut();
      this.router.navigate(['/login']);
    }
    localStorage.clear();
    this.router.navigate(['/login']);
    alert('You are successfully logged out');
  }

}
