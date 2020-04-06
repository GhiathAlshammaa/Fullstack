import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './componets/register/register.component';
import { LoginComponent } from './componets/login/login.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
