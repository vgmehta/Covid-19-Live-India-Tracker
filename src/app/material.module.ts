import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
   exports: [
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatProgressSpinnerModule
   ]
})

export class MatModule { }

