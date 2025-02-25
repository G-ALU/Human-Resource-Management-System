import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar2Component } from '../sidebar-2/sidebar-2.component';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { Footer2Component } from '../footer2/footer2.component';
import { UserService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendee-list',
  standalone: true,
  imports: [RouterOutlet,Sidebar2Component,Navbar2Component,Footer2Component, RouterLink, CommonModule],
  templateUrl: './attendee-list.component.html',
  styleUrl: './attendee-list.component.css'
})
export class AttendeeListComponent implements OnInit {

  users: any[] = [];
  isLoading = false;
  successMessage: string | null = null;

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.userService.fetchUsers().subscribe((data: any) => {
  //     console.log('API response:', data); // Log the API response
  //     if (Array.isArray(data)) {
  //       this.users = data.filter(user => user.role === 'user');
  //     } else if (data.users && Array.isArray(data.users)) {
  //       this.users = data.users.filter((user: { role: string; }) => user.role === 'user');
  //     } else {
  //       console.error('Unexpected API response format:', data);
  //     }
  //   });
  // }

  
  ngOnInit(): void {
    // Fetch users on load
    this.fetchUsers();

    // Listen to route changes and refresh the list
    this.router.events.subscribe(() => {
      if (this.router.url.includes('/manager/list')) {
        this.fetchUsers();
      }
    });
  }

    fetchUsers(): void {
      this.isLoading = true;
      this.userService.fetchUsers().subscribe(
        (data:  { id: string; name: string; email: string; role: string }[]) => {
          this.users = data.filter((user: { id: string; name: string; email: string; role: string }) => user.role === 'user');
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching users:', error);
          this.isLoading = false;
        }
      );
    }

    confirmDeactivation(user: any): void {
      if (confirm(`Are you sure you want to deactivate ${user.username}?`)) {
        this.deactivateUser(user.user_id);
      }
    }
  
    deactivateUser(user_id: string): void {
      this.http.put(`http://localhost:5500/users/deactivate/${user_id}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        () => {
          const user = this.users.find(u => u.user_id === user_id);
          if (user) {
            user.status = 'inactive';
          }
          this.successMessage = 'Account deactivated successfully!';
          this.clearSuccessMessage();
        },
        error => {
          console.error('Error deactivating user:', error);
          this.successMessage = 'Error deactivating account. Please try again.';
          this.clearSuccessMessage();
        }
      );
    }
  
  
    confirmReactivation(user: any): void {
      if (confirm(`Are you sure you want to reactivate ${user.username}?`)) {
        this.reactivateUser(user.user_id);
      }
    }
  
    reactivateUser(user_id: string): void {
      this.http.put(`http://localhost:5500/users/reactive/${user_id}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        () => {
          const user = this.users.find(u => u.user_id === user_id);
          if (user) {
            user.status = 'active';
          }
          this.successMessage = 'Account activated successfully!';
          this.clearSuccessMessage();
        },
        error => {
          console.error('Error reactivating user:', error);
          this.successMessage = 'Error activating account. Please try again.';
          this.clearSuccessMessage();
        }
      );
    }

    clearSuccessMessage(): void {
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }
