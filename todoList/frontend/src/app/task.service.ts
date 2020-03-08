import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { Observable } from "rxjs";
import { Task } from "./models/task.model";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}
  task: any = [];

  getTasks() {
    this.task = this.webReqService.get("list");
    return this.task;
  }

  addTask(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post("list", { title });
  }

  updateTask(task: Task) {
    // We want to send a web request to update a task
    return this.webReqService.patch(`list/${task._id}`, { task });
  }

  removeTask(task: Task) {
    // We want to send a web request to update a task
    return this.webReqService.delete(`list/${task._id}`);
  }
}
