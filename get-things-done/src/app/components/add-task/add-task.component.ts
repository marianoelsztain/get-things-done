import { Component, OnInit } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskTitle = new FormControl('')

  constructor(
    private _service: TaskManagementService,
  ) { }

  ngOnInit(): void {
  }

  onAddTaskClick() {
    this._service.addTask(this.taskTitle.value);
    this.taskTitle.reset();
  }

  isAddTaskDisabled() {
    return !this.taskTitle.value;
  }

}
