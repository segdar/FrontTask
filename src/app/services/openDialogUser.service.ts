
import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ModalUserComponent } from "../modules/modal-user/modal-user.component";


@Injectable({
  providedIn: 'root'
})
export class openDialogUserService {

  public modal = inject(MatDialog);
  private svRouter = inject(Router);
  private isDialogOpen = false;

  openDialog(email: string): void {
    if (this.isDialogOpen) {
      return;
    }

    const dialogRef = this.modal.open(ModalUserComponent, {
      panelClass: 'responsive-dialog',
      data: { email }
    });

   
   
    dialogRef.afterClosed().subscribe({
      next: (data) => {
     
        if (data.status && data.value ) {
          this.svRouter.navigate(['/home']);
          localStorage.setItem('ie', data.value)
          this.isDialogOpen = false;
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isDialogOpen = false;
      }
    });

    this.isDialogOpen = true;
  }
}
