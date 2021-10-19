import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TarifComponent } from './pages/tarif/tarif.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { SmsComponent } from './pages/sms/sms.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ViewCampaignComponent } from './pages/view-campaign/view-campaign.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    UserProfileComponent,
    TarifComponent,
    ContactsComponent,
    TransactionsComponent,
    GroupsComponent,
    SmsComponent,
    ViewCampaignComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
