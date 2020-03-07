import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
// import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";

import { ToDo } from "../../../todo.model";
import { TaskService } from "src/app/task.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  @Input() toDos: ToDo[];
  @Output() toDoChange = new EventEmitter<ToDo>();
  constructor(private taskService: TaskService) {}

  // onCompleteChange(toDo: ToDo, change: MatCheckboxChange) {
  //   this.toDoChange.emit({
  //     ...toDo,
  //     complete: change.checked
  //   });
  // }
  createNewList() {
    this.taskService.createList("Testing").subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit(): void {}
}
