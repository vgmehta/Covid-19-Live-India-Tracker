import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
   exports: [
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatSortModule
   ]
})

export class MatModule { }

