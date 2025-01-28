import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatListModule } from '@angular/material/list';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { refreshTask } from '../../services/Refresh.service';
import { OpenDialogTaskService } from '../../services/openDialogTask.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-board-list-task',
  standalone: true,
  imports: [CommonModule, MatListModule, ScrollingModule,MatIconModule, MatCheckboxModule, MatDividerModule, MatButtonModule ],
  templateUrl: './board-list-task.component.html',
  styleUrls: ['./board-list-task.component.scss']
})
export class BoardListTaskComponent implements OnInit, OnDestroy {
  
 

  Tasks$!: Observable<Task[]>
  selection = new SelectionModel<any>(true, []);

  private readonly svTask = inject(TaskService);
  private svDilogTask = inject(OpenDialogTaskService);
  private destroy = new Subject<void>();


  ngOnInit(): void {
    this.fetchData();
    this.Refresh();
  }

  private fetchData() {

    this.Tasks$ = this.Tasks$ = this.svTask.getTaskAll().pipe(map(task => {
      const tasksWithDates = task.map(task => ({
        ...task,
        dateCreationTime: new Date(task.date_creation).getTime()
      }));


      return tasksWithDates.sort((a, b) => {
        if (a.status === 0 && b.status !== 0) {
          return -1;
        } else if (a.status !== 0 && b.status === 0) {
          return 1;
        } else {
          return b.dateCreationTime - a.dateCreationTime;
        }
      });
    }),
    )
 
  }



  private Refresh() {
    refreshTask.asObservable().pipe(takeUntil(this.destroy)).subscribe({
      next: () => {
        this.fetchData();
      }
    })
  }

  public updateTask(task: Task, isCompleted: boolean) {
    const tmpTask = {
      ...task,
      status: isCompleted ? 1 : 0,
    }
    this.svTask.taskUpdate(tmpTask).subscribe(data => {
      this.fetchData();
    });
  }

  public onTaskClick(task: Task) {

    this.svDilogTask.openDialog(task);
  }

  public onTaskRemove(task: Task) {

    this.svTask.taskDelete(task).pipe(takeUntil(this.destroy)).subscribe({
      next: (data) => {

        if (data) {
          this.fetchData();
        }
      },
      error: (error) => {
        console.error("this error delete element", error);
      }
    })
  }

  trackByTaskId(index: number, task: any): number {
    return task.id; 
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
