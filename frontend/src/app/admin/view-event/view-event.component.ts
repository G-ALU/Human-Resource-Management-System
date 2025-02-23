import { UpdateEventComponent } from './../update-event/update-event.component';
import { event } from './../../../../../Backend/src/Models/event.interface';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { CommonModule } from '@angular/common';
import { EventService1 } from '../../services/event.service';



@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [RouterOutlet, Footer2Component, Sidebar3Component, Navbar3Component, RouterLink, CommonModule, UpdateEventComponent],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent implements OnInit{

  events: any[] = [];
  selectedEvent: any = null;

  constructor(private eventService: EventService1) {}

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents():void{
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data.event;
      },
      error: (err) => {
        console.error('Failed to fetch events', err);
      }
    });
  }

  onUpdate(event: any): void {
    this.selectedEvent = event;
    this.getAllEvents()
  }

  onDelete(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.event_id !== eventId);
      },
      error: (err:any) => {
        console.error('Failed to delete event', err);
      }
    });
  }

  closeModal(updated: boolean): void {
    this.selectedEvent = null;
    if(updated){
      this.getAllEvents()
    }
  }
}
