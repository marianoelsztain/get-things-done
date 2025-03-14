import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  public taskListSubject = new BehaviorSubject<Task[]>([])

  taskList$ = this.taskListSubject.asObservable();

  constructor() { }


  retrieveTaskListFromStorage() {
    const stringifiedTaskList = window.localStorage.getItem('taskList');
    return JSON.parse(stringifiedTaskList);
  }

  updateTaskListState(updatedList: Task[]) {
    this.taskListSubject.next(updatedList);
  }

  saveTaskListToStorage(listToSave: Task[]) {
    window.localStorage.setItem('taskList', JSON.stringify(listToSave));
  }

  addTask(taskTitle: string) {
    const currentTaskList = this.taskListSubject.value;
    const newTaskId = currentTaskList.length + 1
    const newTask = this.createDefaultTask(taskTitle, newTaskId);

    const newTaskList = [...currentTaskList, newTask];

    this.saveTaskListToStorage(newTaskList);
    this.updateTaskListState(newTaskList);
  }

  createDefaultTask(title: string, id: number): Task {
    return {
      id,
      title,
      description: '',
      completed: false,
      deleted: false,
    }
  }

  setDefaultState() {
    this.updateTaskListState(this.retrieveTaskListFromStorage());
  }
}
