import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  completedControl = new FormControl(false)
  constructor() { }

  ngOnInit(): void {
    this.completedControl.setValue(this.task.completed);
    this.completedControl.valueChanges.pipe(

    )
  }



}
