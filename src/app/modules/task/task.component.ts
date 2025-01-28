import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OpenDialogTaskService } from '../../services/openDialogTask.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  private svDilogTask = inject(OpenDialogTaskService);


  openNewTaskDialog() {
    this.svDilogTask.openDialog();

  }





}
