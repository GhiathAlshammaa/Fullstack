import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostListComponent } from "./posts/posts-list/posts-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { HttpModule } from "@angular/http";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";

/* Angular Material */
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HeaderComponent,
    PostCreateComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
