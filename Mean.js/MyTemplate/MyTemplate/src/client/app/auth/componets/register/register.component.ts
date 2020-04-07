import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.form.errors);
    return false;
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
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.value) ? null : { invalidEmail: true };
  }
}
