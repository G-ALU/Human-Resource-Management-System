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

  jobs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust the number of items per page
  constructor(private eventService: EventService1, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getalljobs().subscribe({
      next: (data) => {
        this.jobs = data.jobs;
        console.log(this.jobs)
      },
      error: (err) => {
        console.error('Failed to get the jobs', err);
      }
    });
  }
  get paginatedjobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.jobs.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.jobs.length) {
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
