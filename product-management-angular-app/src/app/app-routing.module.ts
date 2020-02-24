import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'add-product', component: AddProductComponent , canActivate: [AuthGuard]},
  { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard] },
  { path:'register', component: RegisterComponent },
  {path:'contact', component:ContactUsComponent},
  {path:'about', component:AboutComponent},
 
  // { path:'contact', component: ContactUsComponent },

  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
