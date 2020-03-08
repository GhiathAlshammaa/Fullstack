import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TaskService } from "src/app/task.service";
import { Task } from "src/app/models/task.model";
// import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  tasks: Task[];
  allDone: boolean;
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
      console.log("Inserted successfully");
      this.tasks.push(response);
      this.taskTitleInput.nativeElement.value = "";
      this.AreThereIncompleteTasks();
    });

  }

  updateTask(task: Task, change: any) {
    task.status = change.checked;
    this.taskService.updateTask(task).subscribe(() => {
      console.log("Updated successfully");
      this.AreThereIncompleteTasks();
    });
    
  }
  removeTask(task: Task) {
    this.taskService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(h => h !== task);
      console.log("Removed successfully");
    });
  }

  AreThereIncompleteTasks() {
    this.allDone = this.tasks
      ? this.tasks.some(task => task.status === false)
      : null;

    console.log("allDone: " + this.allDone);
  }
}
