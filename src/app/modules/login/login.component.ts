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
import { openDialogUserService } from '../../services/openDialogUser.service';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule,
    MatInputModule,
    MatCardModule],
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
  private svDialoguser = inject(openDialogUserService)
  private destroysuscribe = new Subject<void>();
  

  public loginForm = this.svForm.group({
    email: new FormControl('', [Validators.required,Validators.email]),
  });
  

  onSubmit() {

    if (this.loginForm.valid ) {
        const tmpUser = {
           email: this.loginForm.value.email ?? "",
        }
     
      this.svUser.getUsers(tmpUser).pipe(takeUntil(this.destroysuscribe)).subscribe({
        next: (data:any) => {
          if (data.status && data.value !== '') {
            localStorage.setItem('ie', data.value.id)
            this.svRouter.navigate(['/welcome']);

          } else {
            this.svDialoguser.openDialog(tmpUser.email);
          }
          
        },
        error: (error) => {
     
          console.error('There was an error!', error)
        }

      })
    }

  }


  ngOnDestroy(): void {
    this.loginForm.reset();
    this.destroysuscribe.next();
    this.destroysuscribe.complete();

  }


}

