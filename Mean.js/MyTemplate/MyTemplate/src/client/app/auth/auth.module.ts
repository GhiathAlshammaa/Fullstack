import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./componets/register/register.component";
import { LoginComponent } from "./componets/login/login.component";

/* Material */
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
/* Form */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* Service */
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    /* Material */
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    /* Form */
    FormsModule,
    ReactiveFormsModule,
    /* Service */
    HttpClientModule,

  ],
  providers: [AuthService]
})
export class AuthModule {}
