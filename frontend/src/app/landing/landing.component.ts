import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { AttendeeActionsPageComponent } from '../attendee-component/attendee-actions-page/attendee-actions-page.component';
import { EventService1 } from '../services/event.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RegisterComponent, CommonModule, AttendeeActionsPageComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{

  events: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust the number of items per page
  constructor(private eventService: EventService1, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data.event;
        console.log(this.events)
      },
      error: (err) => {
        console.error('Failed to fetch events', err);
      }
    });
  }
  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.events.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.events.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  viewEvent(): void {
    this.router.navigateByUrl(`/login`)
  }

}
