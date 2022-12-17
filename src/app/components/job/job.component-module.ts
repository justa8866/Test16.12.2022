import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { JobComponent } from './job.component';


@NgModule({
  imports: [MatListModule, CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCardModule],
  declarations: [JobComponent],
  providers: [],
  exports: [JobComponent]
})
export class JobComponentModule {
}
