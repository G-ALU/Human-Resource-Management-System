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
  events: any[] = [];


  constructor(private eventService: EventService1) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data.event;
      },
      error: (err) => {
        console.error('Failed to fetch events', err);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }



  createEvent(event: Event): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const eventData = {
      image: formData.get('image'),
      description: formData.get('description'),
      date: formData.get('date'),
      duration: formData.get('duration'),
      Location: formData.get('Location'),
      Ticketsavailable: formData.get('Ticketsavailable'),
      Singlesprice: formData.get('Singlesprice'),
      Groupsprice: formData.get('Groupsprice'),
    };

    this.eventService.createEvent(eventData).subscribe({

      next: (data) => {
        this.events.push(data.event);
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to create event', err);
      }
      
    });
  }
}
