import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AttendeeDashboardComponent } from './attendee-component/attendee-dashboard/attendee-dashboard.component';
import { AttendeeActionsPageComponent } from './attendee-component/attendee-actions-page/attendee-actions-page.component';
import { AttendeeBookingsComponent } from './attendee-component/attendee-bookings/attendee-bookings.component';
import { AttendeeProfilePageComponent } from './attendee-component/attendee-profile-page/attendee-profile-page.component';
import { AttendeeVieweventComponent } from './attendee-component/attendee-viewevent/attendee-viewevent.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  LandingComponent,LoginComponent, RegisterComponent, AttendeeDashboardComponent, AttendeeActionsPageComponent, AttendeeBookingsComponent, AttendeeProfilePageComponent, AttendeeVieweventComponent, ServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Plana';
}
