import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { ToDo } from "../../../todo.model";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  @Input() toDo: ToDo;

  @Output() completeChange = new EventEmitter<MatCheckboxChange>();

  // constructor() { }

  ngOnInit(): void {}
}
