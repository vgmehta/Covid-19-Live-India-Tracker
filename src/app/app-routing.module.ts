import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllIndiaComponent } from './all-india/all-india.component';
import { StateComponent } from './state/state.component';


const routes: Routes = [
  { path: 'all-india', component: AllIndiaComponent },
  { path: 'state', component: StateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
