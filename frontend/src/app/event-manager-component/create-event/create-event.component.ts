import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar2Component } from '../sidebar-2/sidebar-2.component';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { Footer2Component } from '../footer2/footer2.component';
import { CommonModule } from '@angular/common';
import { EventService1 } from '../../services/event.service';
import { log } from 'console';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [RouterOutlet, Sidebar2Component, Navbar2Component, Footer2Component, CommonModule, RouterLink],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  isModalOpen = false;
  jobs: any[] = [];


  constructor(private eventService: EventService1) {}

  ngOnInit(): void {
    this.fetchjobs();
  }

  fetchjobs(): void {
    this.eventService.getalljobs().subscribe({
      next: (data) => {
        this.jobs = data.jobs;
      },
      error: (err) => {
        console.error('Failed to get the jobs', err);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }



  createjobs(jobs: any): void {
    jobs.preventDefault();
    const formData = new FormData(jobs.target as HTMLFormElement);
    const jobsData = {
      image: formData.get('image'),
      title: formData.get('title'),
      description: formData.get('description'),
      location: formData.get('location'),
      status: formData.get('status'),
      salary: formData.get('salary'),
    };

    this.eventService.createjobs(jobsData).subscribe({

      next: (data) => {
        this.jobs.push(data.jobs);
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to create the job', err);
      }
      
    });
  }
}
