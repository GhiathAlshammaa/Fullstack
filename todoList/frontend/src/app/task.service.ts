import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { Observable } from "rxjs";

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
  
  createTask(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post("list", { title });
  }

}
