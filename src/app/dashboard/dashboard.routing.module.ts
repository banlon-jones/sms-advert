import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TarifComponent} from './pages/tarif/tarif.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {SmsComponent} from './pages/sms/sms.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {ViewCampaignComponent} from './pages/view-campaign/view-campaign.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tarifs', component: TarifComponent},
  { path: 'campaigns', component: GroupsComponent},
  { path: 'campaigns/:id', component: ViewCampaignComponent},
  { path: 'transactions', component: TransactionsComponent},
  { path: 'create-sms', component: SmsComponent },
  { path: 'contacts', component: ContactsComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
