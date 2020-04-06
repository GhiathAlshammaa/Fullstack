import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    return false;
  }
}
