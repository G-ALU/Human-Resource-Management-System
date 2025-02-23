import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AttendeeProfilePageComponent } from '../attendee-profile-page/attendee-profile-page.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, SidebarComponent, AttendeeProfilePageComponent, RouterOutlet, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
