import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports: [
    FilterPipe
  ]
})
export class SharedModule { }
