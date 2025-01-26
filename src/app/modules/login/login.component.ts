import { CommonModule } from '@angular/common';
import { Component,OnDestroy,inject } from '@angular/core';
import {  FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogContainer, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; 
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule,
    MatInputModule,
    MatCardModule, ModalUserComponent, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  //***texto dinamicos

  emailError = 'Por favor ingrese un correo electronico';
  emailInvalid = " Correo electrónico inválido";
  namelogin = 'Login';
  TxtWelcome = "Bienvenidos a Tareas";
  Txtfooter = "Facilitamos tu día a día, ayudándote a gestionar tareas de manera simple y efectiva.";
  /*** */

  private svForm = inject(FormBuilder);
  private svUser = inject(UserService);
  private svRouter = inject(Router);
  private readonly modal = inject(MatDialog);
  private isDialogOpen = false;
  private destroysuscribe = new Subject<void>();
  

  public loginForm = this.svForm.group({
    email: new FormControl('', [Validators.required,Validators.email]),
  });
  


  private openDialog() {

    if (this.isDialogOpen) {
      return;
    }


    const dialogRef = this.modal.open(ModalUserComponent, {
      panelClass: 'responsive-dialog',
      data: { email: this.loginForm.value.email }
    });



    dialogRef.afterClosed().subscribe({
      next: (data) => {
      
        if (data.status && data.value) {

          this.svRouter.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('There was an error!', error)
      }
    })
    

  

  }

  onSubmit() {

    /*if (this.isDialogOpen) {
      return;
    }*/

    if (this.loginForm.valid ) {
        const tmpUser = {
           email: this.loginForm.value.email ?? "",
        }
     
      this.svUser.getUsers(tmpUser).pipe(takeUntil(this.destroysuscribe)).subscribe({
        next: (data:any) => {
          if (data.status && data.value !== '') {
            this.svRouter.navigate(['/home']);
          } else {
            this.openDialog();
            this.isDialogOpen = true;
          }
          
        },
        error: (error) => {
          
          this.isDialogOpen = false;;
          console.error('There was an error!', error)
        }

      })
    }

  }


  ngOnDestroy(): void {
    this.loginForm.reset();
    this.modal.ngOnDestroy();
    this.destroysuscribe.next();
    this.destroysuscribe.complete();
  }


}

