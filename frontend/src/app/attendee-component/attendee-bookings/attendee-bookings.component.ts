import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-attendee-bookings',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavBarComponent, FooterComponent],
  templateUrl: './attendee-bookings.component.html',
  styleUrl: './attendee-bookings.component.css'
})
export class AttendeeBookingsComponent {

}
