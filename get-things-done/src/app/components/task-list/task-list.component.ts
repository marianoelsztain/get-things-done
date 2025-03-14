import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements AfterViewInit {
  taskList = this._service.taskList$;

  constructor(
    private _service: TaskManagementService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit(): void {
    this._service.setDefaultState();
    this._cdr.detectChanges();
  }

  trackByTaskId(_index, task: Task) {
    return task.id
  }

}
