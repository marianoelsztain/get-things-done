import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskManagementService } from '../../services/task-management.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() task: Task;

  @Output() cancelClicked: EventEmitter<void> = new EventEmitter();

  constructor(
    private _service: TaskManagementService,
  ) { }

  ngOnInit(): void {
  }

  onDeleteButtonClick() {
    this._service.deleteTask(this.task.id);
  }

  onCancelButtonClick() {
    this.cancelClicked.emit()
  }

}
