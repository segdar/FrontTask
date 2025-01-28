import { Component,  OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { MatDividerModule } from '@angular/material/divider';
import { BoardListTaskComponent } from '../board-list-task/board-list-task.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, TaskComponent, BoardListTaskComponent, MatDividerModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {



  private svRouter = inject(Router);

  logout() {
    localStorage.clear();
    this.svRouter.navigate(['/login']);
   
    

  }


  ngOnDestroy(): void {
    this.svRouter.ngOnDestroy();
  }

}
