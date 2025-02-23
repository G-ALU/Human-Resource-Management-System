import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar2Component } from '../sidebar-2/sidebar-2.component';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { Footer2Component } from '../footer2/footer2.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterOutlet, Sidebar2Component,Navbar2Component, Footer2Component],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  sendNotification() {
    // Handle send notification logic here
  }
}
