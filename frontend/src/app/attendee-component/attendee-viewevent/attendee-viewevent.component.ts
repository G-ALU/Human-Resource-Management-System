import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EventService1 } from '../../services/event.service';

@Component({
  selector: 'app-attendee-viewevent',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FooterComponent, NavBarComponent],
  templateUrl: './attendee-viewevent.component.html',
  styleUrls: ['./attendee-viewevent.component.css']
})
export class AttendeeVieweventComponent implements OnInit {
  jobs: any;  // Variable to store the event data

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService1
  ) {}

  ngOnInit(): void {
    this.getonejob();
  }

  getonejob(): void {
    const jobId = this.route.snapshot.paramMap.get('id');  // Get the event ID from the URL
    if (jobId) {
      this.eventService.getonejob(jobId).subscribe({
        next: (data) => {
          this.jobs = data.jobs;
          console.log(this.jobs)
        },
        error: (err) => {
          console.error('Failed to get the job', err);
        }
      });
    }
  }
}
