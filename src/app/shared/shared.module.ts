import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [RegisterComponent, DeleteModalComponent],
  exports: [
    RegisterComponent
  ],
  entryComponents: [
    DeleteModalComponent
  ]
})
export class SharedModule { }
