import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { Navbar2Component } from "./navbar2/navbar2.component";

@Component({
  selector: 'app-event-manager-component',
  standalone: true,
  imports: [Navbar2Component, ProfileComponent],
  templateUrl: './event-manager-component.component.html',
  styleUrl: './event-manager-component.component.css'
})
export class EventManagerComponentComponent {
       selectedSection: string = 'profile';
       onSectionSelected(section: string){
        this.selectedSection = section;
       }
}
