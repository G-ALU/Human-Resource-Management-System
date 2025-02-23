import { RoleSwitchService } from './../../services/switch.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { ManagerService } from '../../services/manager.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [RouterOutlet,Footer2Component, Sidebar3Component,Navbar3Component, RouterLink, CommonModule],
  templateUrl:'./manager-list.component.html',
  styleUrl: './manager-list.component.css'
})
export class ManagerListComponent implements OnInit{

  managers: any[] = [];
  isLoading = false;
  successMessage: string | null = null;

  constructor(private managerService: ManagerService, private switchService: RoleSwitchService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.managerService.fetchManagers().subscribe((data: any) => {
  //     console.log('API response:', data); // Log the API response
  //     if (Array.isArray(data)) {
  //       this.managers = data.filter(user => user.role === 'manager');
  //     } else if (data.managers && Array.isArray(data.managers)) {
  //       this.managers = data.users.filter((user: { role: string; }) => user.role === 'manager');
  //     } else {
  //       console.error('Unexpected API response format:', data);
  //     }
  //   });
  // }

  ngOnInit(): void {
    // Fetch managers on load
    this.fetchManagers();

    // Listen to route changes and refresh the list
    this.router.events.subscribe(() => {
      if (this.router.url.includes('/admin/managerlist')) {
        this.fetchManagers();
      }
    });
  }

  fetchManagers(): void {
    this.isLoading = true;
    this.managerService.fetchManagers().subscribe(
      (data:  { id: string; name: string; email: string; role: string }[]) => {
        this.managers = data.filter((manager: { id: string; name: string; email: string; role: string }) => manager.role === 'manager');
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching managers:', error);
        this.isLoading = false;
      }
    );
  }

  // onDeleteClick(user_id: string): void {
  //   if (confirm('Would you like to switch the role of this user to employee?')) {
  //     this.switchService.switchRoleToUser(user_id).subscribe(
  //       response => {
  //         console.log('Role switched successfully: Employee', response);
          
  //         // Find the manager being switched
  //         const switchedManager = this.managers.find(manager => manager.user_id === user_id);
          
  //         if (switchedManager) {
  //           // Remove from managers list
  //           this.managers = this.managers.filter(manager => manager.user_id !== user_id);
            
  //           // Change role and add to attendee list
  //           switchedManager.role = 'user';
            
  //           // Manually update the attendee list
  //           this.managerService.fetchManagers().subscribe((data: any) => {
  //             if (Array.isArray(data)) {
  //               this.managers = data.filter(user => user.role === 'manager');
  //             }
  //           });
  //         }
  //       },
  //       error => {
  //         console.error('Error switching role:', error);
  //       }
  //     );
  //   }
  // }
  

  confirmDeactivation(manager: any): void {
    if (confirm(`Are you sure you want to deactivate ${manager.username}?`)) {
      this.deactivateUser(manager.user_id);
    }
  }

  deactivateUser(user_id: string): void {
    this.http.put(`http://localhost:5500/users/deactivate/${user_id}`, {}, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        const user = this.managers.find(u => u.user_id === user_id);
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


  confirmReactivation(manager: any): void {
    if (confirm(`Are you sure you want to reactivate ${manager.username}?`)) {
      this.reactivateUser(manager.user_id);
    }
  }

  reactivateUser(user_id: string): void {
    this.http.put(`http://localhost:5500/users/reactive/${user_id}`, {}, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        const user = this.managers.find(u => u.user_id === user_id);
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
     
  switchToUser(user_id: string): void {
    if (confirm('Would you like to switch the role of this user to Employee?')) {
      this.isLoading = true;
      this.switchService.switchRoleToUser(user_id).subscribe(
        response => {
          console.log('User role switched to Employee:', response);
          this.successMessage = 'Role switched successfully to employee!';
          this.fetchManagers(); // Refresh list
          this.isLoading = false;
          this.clearSuccessMessage();
        },
        error => {
          console.error('Error switching role:', error);
          this.successMessage = 'Error switching role. Please try again.';
          this.isLoading = false;
          this.clearSuccessMessage();
        }
      );
    }
  }
  
  // Function to clear the success message after 3 seconds
  clearSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
 
  
}
