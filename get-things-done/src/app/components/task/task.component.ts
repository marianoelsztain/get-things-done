import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { FormControl } from '@angular/forms';
import { TaskManagementService } from '../../services/task-management.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;

  completedControl = new FormControl(false)
  displayDeleteModal = false;
  constructor(
    private _service: TaskManagementService,
  ) { }

  ngOnInit(): void {
    this.completedControl.setValue(this.task.completed);
  }

  onTaskCheckClick() {
    this._service.toggleTaskCompletion(this.task.id)
  }

  onDeleteTaskClick() {
    this.displayDeleteModal = true;
  }

  handleModalCancelClicked() {
    this.displayDeleteModal = false;
  }
}
