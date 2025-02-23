import { EventServices } from './../../services/update.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService1 } from '../../services/event.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit{
  @Input() event: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  updateEventForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private eventService: EventServices) {}

  ngOnInit(): void {
    this.updateEventForm = this.fb.group({
      image: [this.event.image, [Validators.required]],
      description: [this.event.description, [Validators.required]],
      date: [this.event.date, [Validators.required]],
      duration: [this.event.duration, [Validators.required]],
      Location: [this.event.Location, [Validators.required]],
      Ticketsavailable: [this.event.Ticketsavailable, [Validators.required]],
      Singlesprice: [this.event.Singlesprice, [Validators.required]],
      Groupsprice: [this.event.Groupsprice, [Validators.required]]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit(false);
  }

  onSubmit(): void {
    if (this.updateEventForm.valid) {
      const updatedData = this.updateEventForm.value
      const formData = new FormData();
      formData.append('image', this.updateEventForm.get('image')?.value);
      formData.append('description', this.updateEventForm.get('description')?.value);
      formData.append('date', this.updateEventForm.get('date')?.value);
      formData.append('duration', this.updateEventForm.get('duration')?.value);
      formData.append('Location', this.updateEventForm.get('Location')?.value);
      formData.append('Ticketsavailable', this.updateEventForm.get('Ticketsavailable')?.value);
      formData.append('Singlesprice', this.updateEventForm.get('Singlesprice')?.value);
      formData.append('Groupsprice', this.updateEventForm.get('Groupsprice')?.value);


      console.log(formData)

      this.eventService.updateEvent(this.event.event_id, updatedData).subscribe({
        next: (data) => {
          // Handle successful update
          console.log(data)
          this.closeModalEvent.emit(true);
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to update event', err);
        }
      });
    }
  }
}
