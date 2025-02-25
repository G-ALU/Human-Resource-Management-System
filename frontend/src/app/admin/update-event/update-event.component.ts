import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventServices } from '../../services/update.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit {
  @Input() jobs: any;
  @Output() closeModaljobs = new EventEmitter<boolean>();
  updatejobsForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private eventService: EventServices) {}

  ngOnInit(): void {
    this.updatejobsForm = this.fb.group({
      image: [this.jobs?.image || '', [Validators.required]],
      title: [this.jobs?.title || '', [Validators.required]],
      description: [this.jobs?.description || '', [Validators.required]],
      location: [this.jobs?.location || '', [Validators.required]],
      status: [this.jobs?.status || 'Open', [Validators.required]],
      salary: [this.jobs?.salary || '', [Validators.required]]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  closeModal(): void {
    this.closeModaljobs.emit(false);
  }

  onSubmit(): void {
    if (this.updatejobsForm.valid) {
      const formValues = this.updatejobsForm.value;

      // If no file is selected, send JSON; otherwise, send FormData
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('location', formValues.location);
        formData.append('status', formValues.status);
        formData.append('salary', formValues.salary.toString());

        this.eventService.updatejobs(this.jobs.job_id, formData).subscribe({
          next: (data) => {
            console.log('Update successful with file:', data);
            this.closeModaljobs.emit(true);
            this.closeModal();
          },
          error: (err) => {
            console.error('Failed to update Job with file:', err);
          }
        });
      } else {
        const jobData = {
          image: formValues.image, // Reuse existing image URL
          title: formValues.title,
          description: formValues.description,
          location: formValues.location,
          status: formValues.status,
          salary: formValues.salary
        };

        this.eventService.updatejobs(this.jobs.job_id, jobData).subscribe({
          next: (data) => {
            console.log('Update successful without file:', data);
            this.closeModaljobs.emit(true);
            this.closeModal();
          },
          error: (err) => {
            console.error('Failed to update Job without file:', err);
          }
        });
      }
    }
  }
}

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { EventServices } from '../../services/update.service';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-update-event',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
//   templateUrl: './update-event.component.html',
//   styleUrl: './update-event.component.css'
// })
// export class UpdateEventComponent implements OnInit {
//   @Input() jobs: any;
//   @Output() closeModaljobs = new EventEmitter<boolean>();
//   updatejobsForm!: FormGroup;
//   selectedFile: File | null = null;

//   constructor(private fb: FormBuilder, private eventService: EventServices) {}

//   ngOnInit(): void {
//     this.updatejobsForm = this.fb.group({
//       image: [this.jobs?.image || '', [Validators.required]],
//       title: [this.jobs?.title || '', [Validators.required]],
//       description: [this.jobs?.description || '', [Validators.required]],
//       location: [this.jobs?.location || '', [Validators.required]],
//       status: [this.jobs?.status || 'Open', [Validators.required]],
//       salary: [this.jobs?.salary || '', [Validators.required]]
//     });
//   }

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       // Optionally update the form control value to reflect the file selection
//       this.updatejobsForm.patchValue({ image: file.name });
//     }
//   }

//   closeModal(): void {
//     this.closeModaljobs.emit(false);
//   }

//   onSubmit(): void {
//     if (this.updatejobsForm.valid) {
//       const formData = new FormData();
//       formData.append('title', this.updatejobsForm.get('title')?.value);
//       formData.append('description', this.updatejobsForm.get('description')?.value);
//       formData.append('location', this.updatejobsForm.get('location')?.value);
//       formData.append('status', this.updatejobsForm.get('status')?.value);
//       formData.append('salary', this.updatejobsForm.get('salary')?.value);

//       if (this.selectedFile) {
//         formData.append('image', this.selectedFile);
//       } else {
//         formData.append('image', this.updatejobsForm.get('image')?.value);
//       }

//       this.eventService.updatejobs(this.jobs.job_id, formData).subscribe({
//         next: (data) => {
//           console.log('Update successful:', data);
//           this.closeModaljobs.emit(true); // Notify parent to refresh table
//           this.closeModal(); // Close the modal
//         },
//         error: (err) => {
//           console.error('Failed to update Job details', err);
//         }
//       });
//     }
//   }
// }


// import { EventServices } from './../../services/update.service';
// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { EventService1 } from '../../services/event.service';
// import { RouterOutlet } from '@angular/router';


// @Component({
//   selector: 'app-update-event',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
//   templateUrl: './update-event.component.html',
//   styleUrl: './update-event.component.css'
// })
// export class UpdateEventComponent implements OnInit{
//   @Input() jobs: any;
//   @Output() closeModaljobs = new EventEmitter<boolean>();
//   updatejobsForm!: FormGroup;
//   selectedFile: File | null = null;

//   constructor(private fb: FormBuilder, private eventService: EventServices) {}


//   ngOnInit(): void {
//     this.updatejobsForm = this.fb.group({
//       image: [this.jobs?.image || '', [Validators.required]],
//       title: [this.jobs?.title || '', [Validators.required]],
//       description: [this.jobs?.description || '', [Validators.required]],
//       location: [this.jobs?.location || '', [Validators.required]],
//       status: [this.jobs?.status || 'Open', [Validators.required]],
//       salary: [this.jobs?.salary || '', [Validators.required]]
//     });
//   }
//   // ngOnInit(): void {
//   //   this.updatejobsForm = this.fb.group({
//   //     image: [this.jobs.image, [Validators.required]],
//   //     title: [this.jobs.title, [Validators.required]],
//   //     description: [this.jobs.description, [Validators.required]],
//   //     location: [this.jobs.location, [Validators.required]],
//   //     status: [this.jobs.status ||'open','closed', [Validators.required]],
//   //     salary: [this.jobs.salary, [Validators.required]]
//   //   });
//   // }

//   // job_id: string,
//   //   image: string,
//   //   title: string,
//   //   description: string,
//   //   location: string,
//   //   status: string,
//   //   salary: number,

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//     }
//   }

//   closeModal(): void {
//     this.closeModaljobs.emit(false);
//   }


//   onSubmit(): void {
//     if (this.updatejobsForm.valid) {
//       const formData = new FormData();
//       formData.append('title', this.updatejobsForm.get('title')?.value);
//       formData.append('description', this.updatejobsForm.get('description')?.value);
//       formData.append('location', this.updatejobsForm.get('location')?.value);
//       formData.append('status', this.updatejobsForm.get('status')?.value);
//       formData.append('salary', this.updatejobsForm.get('salary')?.value);
      
//       if (this.selectedFile) {
//         formData.append('image', this.selectedFile);
//       } else {
//         formData.append('image', this.updatejobsForm.get('image')?.value);
//       }

//       this.eventService.updatejobs(this.jobs.job_id, formData).subscribe({
//         next: (data) => {
//           console.log('Update successful:', data);
//           this.closeModaljobs.emit(true);
//           this.closeModal();
//         },
//         error: (err) => {
//           console.error('Failed to update Job details', err);
//         }
//       });
//     }
//   }

//   // onSubmit(): void {
//   //   if (this.updatejobsForm.valid) {
//   //     const updatedData = this.updatejobsForm.value
//   //     const formData = new FormData();
//   //     formData.append('image', this.updatejobsForm.get('image')?.value);
//   //     formData.append('title', this.updatejobsForm.get('title')?.value);
//   //     formData.append('description', this.updatejobsForm.get('description')?.value);
//   //     formData.append('location', this.updatejobsForm.get('location')?.value);
//   //     formData.append('status', this.updatejobsForm.get('status')?.value);
//   //     formData.append('salary', this.updatejobsForm.get('salary')?.value);


//   //     console.log(formData)

//   //     this.eventService.updatejobs(this.jobs.job_id, updatedData).subscribe({
//   //       next: (data) => {
//   //         // Handle successful update
//   //         console.log(data)
//   //         this.closeModaljobs.emit(true);
//   //         this.closeModal();
//   //       },
//   //       error: (err) => {
//   //         console.error('Failed to update Job details', err);
//   //       }
//   //     });
//   //   }
//   // }
// }
