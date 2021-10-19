import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
