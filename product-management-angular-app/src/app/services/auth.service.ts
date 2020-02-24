import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  baseURL: string = "http://localhost:3000/api/users";

  isUserLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }
  // for logOut to disappear incase, if you didnot login yet
  loggedIn() {
    if (localStorage.getItem('user'))
      this.isUserLoggedIn = true;
    return this.isUserLoggedIn;
  }

  // Register User
  registerUser(user) {
    console.log('Received: ' + user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL+'/register', user, {headers: headers});
  }

  // AUthenticate User
  login(user) {
    console.log('login');
    console.log('Received: ' + user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL+'/login', user, {headers: headers}).pipe(map((user:any) => {
      //login successful if there is a jwt token in response
      console.log(user);
      this.isUserLoggedIn = true;
      if (user && user.token) {
        this.storeUserData(user.token, user);
      }
      return user;
    }));
  }

  // store token and user details inside browser under localStorage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // logOut() function
  logOut() {
    this.isUserLoggedIn = false;
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // getProfile()
  getProfile() {
    console.log('getProfile from Service called');
    let headers = new HttpHeaders({
      "Authorization": this.authToken,
      'Content-Type': 'application/json'
    });
    this.loadToken();
    console.log('Token Set: ' + this.authToken);
    return this.http.get(this.baseURL + '/profile', {headers: headers});
  }

  // loadToken()
  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log('Token Received: ' + token);
    this.authToken = token;
  }
}
