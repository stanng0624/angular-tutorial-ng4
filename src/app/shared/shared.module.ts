import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownDirective
  ]
})
export class SharedModule {

}
