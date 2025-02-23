import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { EventService1 } from '../../services/event.service';

@Component({
  selector: 'app-attendee-actions-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent, NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './attendee-actions-page.component.html',
  styleUrl: './attendee-actions-page.component.css'
})
export class AttendeeActionsPageComponent implements OnInit{


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


  get isLastPage(): boolean {
    return this.currentPage * this.itemsPerPage >= this.events.length;
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  viewEvent(eventId: string): void {
    this.router.navigateByUrl(`/view/${eventId}`)
  }

}
