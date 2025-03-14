import { Component, OnInit } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';

@Component({
  selector: 'app-filter-tasks',
  templateUrl: './filter-tasks.component.html',
  styleUrls: ['./filter-tasks.component.scss']
})
export class FilterTasksComponent implements OnInit {
  selectedFilter = this._service.filterControl;
  constructor(
    private _service: TaskManagementService,
  ) { }

  ngOnInit(): void {
  }

}
