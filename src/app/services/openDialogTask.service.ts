import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Task } from "../models/task.model";
import { NewTaskComponent } from "../modules/modal-task/new-task.component";
import { refreshTask } from "./Refresh.service";



@Injectable({
  providedIn: 'root'
})

export class OpenDialogTaskService {

  private readonly modal = inject(MatDialog);
  private svDialog = inject(MatDialog);

 

  openDialog(task?:Task) {

    const dialogRef = this.svDialog.open(NewTaskComponent, {
      data: { values:task},
      panelClass: 'custom-container',
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          refreshTask.next();
        }
       
       
      },
      error: (error) =>{
        console.error("this a error", error);
      }
    })

  }

  


}
