import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../auth.service';

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any;
  active = true; 

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = formBuilder.group({
      firstName: ["", Validators.required],
      lastName: "",
      email: ["", [Validators.required, emailValid()]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    }, {validator: matchingFields('password', 'confirmPassword')});
  }

  ngOnInit(): void {}

  onSubmit() {
    this.auth.register(this.form.value);
    console.log(this.form.invalid);
    if(!this.form.invalid){
      this.form.reset();
    }
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }
}

function matchingFields(field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value){
      return { mismatchedFields: true }
    }
  }
}

function emailValid() {
  return control => {
    // tslint:disable-next-line: max-line-length
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.value) ? null : { invalidEmail: true };
  }
}
