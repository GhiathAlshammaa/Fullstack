import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/task.service";
import { Task } from 'src/app/models/task.model';
// import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  tasks: any;
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
    this.taskService.createTask(title).subscribe((response: Task) => {
      console.log(response);
      this.tasks.push(response);
    });
  }
}
