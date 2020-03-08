import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TaskService } from "src/app/task.service";
import { Task } from "src/app/models/task.model";
import * as _ from "underscore";
// import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  tasks: Task[];
  @ViewChild("taskTitleInput") taskTitleInput: ElementRef;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((task: Task[]) => {
      this.tasks = task;
    });
  }

  addTask(title: string) {
    this.taskService.addTask(title).subscribe((response: Task) => {
      console.log(response);
      this.tasks.push(response);
    });
    this.taskTitleInput.nativeElement.value = "";
  }

  updateTask(task: Task, change: any) {
    task.status = change.checked;
    this.taskService.updateTask(task).subscribe(() => {
      console.log("Updated successfully");
    });
  }
  removeTask(task: Task) {
    this.taskService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(h => h !== task);
      console.log("Removed successfully");
    });
  }
}
