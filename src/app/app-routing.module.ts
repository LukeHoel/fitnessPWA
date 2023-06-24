import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { StatsViewComponent } from './components/stats-view/stats-view.component';

const routes: Routes = [
  {
    path: 'data-entry',
    component: DataEntryComponent
  },
  {
    path: 'stats-view',
    component: StatsViewComponent
  },
  {
    path: '',
    redirectTo: '/stats-view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
