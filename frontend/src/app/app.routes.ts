import { Routes } from '@angular/router';
import { AttendeeDashboardComponent } from './attendee-component/attendee-dashboard/attendee-dashboard.component';
import { AttendeeProfilePageComponent } from './attendee-component/attendee-profile-page/attendee-profile-page.component';
import { AttendeeActionsPageComponent } from './attendee-component/attendee-actions-page/attendee-actions-page.component';
import { AttendeeVieweventComponent } from './attendee-component/attendee-viewevent/attendee-viewevent.component';
import { AttendeeBookingsComponent } from './attendee-component/attendee-bookings/attendee-bookings.component';
import { DashboardComponent } from './event-manager-component/dashboard/dashboard.component';
import { ProfileComponent } from './event-manager-component/profile/profile.component';
import { CreateEventComponent } from './event-manager-component/create-event/create-event.component';
import { AttendeeListComponent } from './event-manager-component/attendee-list/attendee-list.component';
import { NotificationsComponent } from './event-manager-component/notifications/notifications.component';
import { ManagerListComponent } from './admin/manager-list/manager-list.component';
import { AttendeeList2Component } from './admin/attendee-list/attendee-list.component';
import { Dashboard1Component } from './admin/dashboard/dashboard.component';
import { ViewEventComponent } from './admin/view-event/view-event.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './attendee-component/sidebar/sidebar.component';
import { Sidebar2Component } from './event-manager-component/sidebar-2/sidebar-2.component';
import { Sidebar3Component } from './admin/sidebar3/sidebar3.component';

export const routes: Routes = [

  {path:'', component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path:'attendee', component:SidebarComponent, children:[
    {path:'',pathMatch:'full',redirectTo:'dashboard'},
    {path:'dashboard' , component:AttendeeDashboardComponent},
    {path:'actions', component:AttendeeActionsPageComponent},
    {path:'bookings', component:AttendeeBookingsComponent},
    {path:'profile', component:AttendeeProfilePageComponent}
    ]},

    {path:'view/:id', component:AttendeeVieweventComponent},



    {path:'manager',component:Sidebar2Component, children:[
      {path:'',pathMatch:'full',redirectTo:'dashboard2'},
      {path:'dashboard2', component:DashboardComponent},
      {path:'create', component:CreateEventComponent},
      {path:'list', component:AttendeeListComponent},
      {path:'notifications',component:NotificationsComponent},
      {path:'profile2',component:ProfileComponent}
    ]},




  {path:'admin', component:Sidebar3Component, children:[
    {path:'',pathMatch:'full',redirectTo:'dashboard1'},
    {path:'list1',component:AttendeeList2Component},
    {path:'managerlist', component:ManagerListComponent},
    {path:'dashboard1', component:Dashboard1Component},
    {path:'view1', component:ViewEventComponent},
    {path:'profile2',component:ProfileComponent}


  ]},



];
