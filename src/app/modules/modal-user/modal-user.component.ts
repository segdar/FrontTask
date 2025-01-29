import { Component,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent  {
 
  
  emailName = inject(DIALOG_DATA).email;
  private svUser = inject(UserService);
  public svmodal = inject(MatDialogRef<ModalUserComponent>);

  public Stopnew() {
    this
  }

  public saveNewUser() {
    this.svUser.createUser({ email: this.emailName }).subscribe({
      next: (data) => {
       
        this.svmodal.close(data);

      },
      error: (error) => {
        console.log("error modal", error);
      }
    })
    
  }



}
