import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  public taskList = new Subject<Task[]>()

  constructor() { }

  getTaskList(): Observable<Task[]> {
    return this.taskList.asObservable();
  }

  retrieveTaskListFromStorage() {
    const taskListString = window.localStorage.getItem('taskList');
    this.taskList.next(JSON.parse(taskListString));
  }

  saveTaskList(listToSave: Task[]) {
    const taskListStringified = JSON.stringify(listToSave);
    window.localStorage.setItem('taskList', taskListStringified);
  }

}
