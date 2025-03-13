import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  taskList: Task[]

  constructor() { }

  getTaskList() {
    const taskListString = window.localStorage.getItem('taskList');
    this.taskList = JSON.parse(taskListString);
  }

  saveTaskList(listToSave: Task[]) {
    const taskListStringified = JSON.stringify(listToSave);
    window.localStorage.setItem('taskList', taskListStringified);
  }

}
