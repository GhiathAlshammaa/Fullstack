import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./componets/register/register.component";
import { LoginComponent } from "./componets/login/login.component";

/* Material */
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    /* Material */
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class AuthModule {}
