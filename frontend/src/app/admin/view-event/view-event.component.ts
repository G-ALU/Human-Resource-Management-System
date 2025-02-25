import { UpdateEventComponent } from './../update-event/update-event.component';
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
export class ViewEventComponent implements OnInit {
  jobs: any[] = [];
  selectedjobs: any = null;

  constructor(private eventService: EventService1) {}

  ngOnInit(): void {
    this.getalljobs();
  }

  getalljobs(): void {
    this.eventService.getalljobs().subscribe({
      next: (data) => {
        // Adjust based on actual backend response structure
        this.jobs = data.jobs || data; // Handle both { jobs: [...] } and plain array
        console.log('Jobs fetched:', this.jobs);
      },
      error: (err) => {
        console.error('Failed to get Jobs:', err);
      }
    });
  }

  onUpdate(jobId: string): void {
    this.selectedjobs = this.jobs.find(job => job.job_id === jobId);
  }

  onDelete(jobId: string): void {
    this.eventService.deletejobs(jobId).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.job_id !== jobId);
      },
      error: (err) => {
        console.error('Failed to delete the Job:', err);
      }
    });
  }

  closeModal(updated: boolean): void {
    this.selectedjobs = null;
    if (updated) {
      this.getalljobs(); // Refresh table after update
    }
  }
}


// import { UpdateEventComponent } from './../update-event/update-event.component';
// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';
// import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
// import { Sidebar3Component } from '../sidebar3/sidebar3.component';
// import { Navbar3Component } from '../navbar3/navbar3.component';
// import { CommonModule } from '@angular/common';
// import { EventService1 } from '../../services/event.service';

// @Component({
//   selector: 'app-view-event',
//   standalone: true,
//   imports: [RouterOutlet, Footer2Component, Sidebar3Component, Navbar3Component, RouterLink, CommonModule, UpdateEventComponent],
//   templateUrl: './view-event.component.html',
//   styleUrl: './view-event.component.css'
// })
// export class ViewEventComponent implements OnInit {
//   jobs: any[] = [];
//   selectedjobs: any = null;

//   constructor(private eventService: EventService1) {}

//   ngOnInit(): void {
//     this.getalljobs();
//   }

//   getalljobs(): void {
//     this.eventService.getalljobs().subscribe({
//       next: (data) => {
//         this.jobs = data.jobs; // Ensure backend returns { jobs: [...] }
//       },
//       error: (err) => {
//         console.error('Failed to get Jobs', err);
//       }
//     });
//   }

//   onUpdate(jobId: string): void {
//     this.selectedjobs = this.jobs.find(job => job.job_id === jobId); // Pass the full job object
//   }

//   onDelete(jobId: string): void {
//     this.eventService.deletejobs(jobId).subscribe({
//       next: () => {
//         this.jobs = this.jobs.filter(job => job.job_id !== jobId);
//       },
//       error: (err) => {
//         console.error('Failed to delete the Job', err);
//       }
//     });
//   }

//   closeModal(updated: boolean): void {
//     this.selectedjobs = null;
//     if (updated) {
//       this.getalljobs(); // Refresh the table data
//     }
//   }
// }

// import { UpdateEventComponent } from './../update-event/update-event.component';
// import { jobs } from './../../../../../Backend/src/Models/event.interface';
// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';
// import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
// import { Sidebar3Component } from '../sidebar3/sidebar3.component';
// import { Navbar3Component } from '../navbar3/navbar3.component';
// import { CommonModule } from '@angular/common';
// import { EventService1 } from '../../services/event.service';



// @Component({
//   selector: 'app-view-event',
//   standalone: true,
//   imports: [RouterOutlet, Footer2Component, Sidebar3Component, Navbar3Component, RouterLink, CommonModule, UpdateEventComponent],
//   templateUrl: './view-event.component.html',
//   styleUrl: './view-event.component.css'
// })
// export class ViewEventComponent implements OnInit{

//   jobs: any[] = [];
//   selectedjobs: any = null;

//   constructor(private eventService: EventService1) {}

//   ngOnInit(): void {
//     this.getalljobs()
//   }

//   getalljobs():void{
//     this.eventService.getalljobs().subscribe({
//       next: (data) => {
//         this.jobs = data.jobs;
//       },
//       error: (err) => {
//         console.error('Failed to get Jobs', err);
//       }
//     });
//   }

//   onUpdate(jobs: any): void {
//     this.selectedjobs = jobs;
//     this.getalljobs()
//   }

//   onDelete(jobId: string) {
//     this.eventService.deletejobs(jobId).subscribe({
//       next: () => {
//         this.jobs = this.jobs.filter(jobs => jobs.job_id !== jobId);
//       },
//       error: (err:any) => {
//         console.error('Failed to delete the Job', err);
//       }
//     });
//   }

//   closeModal(updated: boolean): void {
//     this.selectedjobs = null;
//     if(updated){
//       this.getalljobs()
//     }
//   }
// }
