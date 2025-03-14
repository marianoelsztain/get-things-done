import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Filters } from '../models/filters';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  public taskListSubject = new BehaviorSubject<Task[]>([])
  public filterControl = new FormControl(Filters.all)

  private filterValueChanges$ = this.filterControl.valueChanges.pipe(startWith(Filters.all))

  taskList$ = combineLatest([this.taskListSubject.asObservable(), this.filterValueChanges$])
    .pipe(
      map(([taskList, currentFilter]) =>{
        return taskList.filter((task) => {
          switch (currentFilter) {
            case Filters.completed:
              return !task.deleted && task.completed;
            case Filters.incomplete:
              return !task.deleted && !task.completed;
            case Filters.all:
            default:
              return !task.deleted;
          }
        })
      })
    );

  deletedTasks$ = this.taskListSubject.asObservable().pipe(
    map((taskList) => taskList.filter((task) => task.deleted)),
  )

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

  saveChanges(listToSave: Task[]) {
    this.saveTaskListToStorage(listToSave);
    this.updateTaskListState(listToSave);
  }

  addTask(taskTitle: string) {
    const currentTaskList = this.taskListSubject.value;
    const newTaskId = currentTaskList.length + 1
    const newTask = this.createDefaultTask(taskTitle, newTaskId);

    const newTaskList = [...currentTaskList, newTask];

    this.saveChanges(newTaskList);
  }

  toggleTaskCompletion(taskId: number) {
    const currentTaskList = this.taskListSubject.value;
    const newTaskList = currentTaskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )

    this.saveChanges(newTaskList);
  }

  deleteTask(taskId: number) {
    const currentTaskList = this.taskListSubject.value;
    const newTaskList = currentTaskList.map((task) =>
      task.id === taskId ? { ...task, deleted: true } : task
    )

    this.saveChanges(newTaskList);
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
