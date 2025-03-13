import { Component, OnInit } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskList = this._service.getTaskList();

  constructor(
    private _service: TaskManagementService,
  ) { }

  ngOnInit(): void {

  }

}
