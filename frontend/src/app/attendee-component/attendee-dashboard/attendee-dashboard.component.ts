import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-attendee-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FooterComponent, NavBarComponent],
  templateUrl: './attendee-dashboard.component.html',
  styleUrl: './attendee-dashboard.component.css'
})
export class AttendeeDashboardComponent {

}
