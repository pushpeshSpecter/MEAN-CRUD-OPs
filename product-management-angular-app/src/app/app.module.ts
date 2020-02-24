// Predefined modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// reactive forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// httpclient service
import { HttpClientModule } from '@angular/common/http';
// user defined module for routes
import { AppRoutingModule } from './app-routing.module';

// root component
import { AppComponent } from './app.component';
// user defined components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { RegisterComponent } from './components/register/register.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {NgxPaginationModule} from 'ngx-pagination';


//user defined pipe

import { NamePipe } from './pipes/name.pipe';

import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [     // for components, directives, pipes
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    NamePipe,
    RegisterComponent,
    ContactUsComponent,
   
    AboutComponent,
   
    NavbarComponent
  ],
  imports: [          // for modules like RoutingModule, FormsModule, etc
    BrowserModule,
    AppRoutingModule,
    FormsModule,      // Template Driven Forms
    HttpClientModule,  // for HttpClient service
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],    // for service injections
  bootstrap: [AppComponent]     // kickstarting Root component
})
export class AppModule { }
