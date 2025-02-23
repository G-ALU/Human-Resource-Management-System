import { Component , OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { UserService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RoleSwitchService } from '../../services/switch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendee-list1',
  standalone: true,
  imports: [RouterOutlet,Footer2Component, Sidebar3Component, Navbar3Component, RouterLink, CommonModule],
  templateUrl: './attendee-list.component.html',
  styleUrl: './attendee-list.component.css'
})
export class AttendeeList2Component implements OnInit {
  users: any[] = [];
  isLoading = false;
  successMessage: string | null = null;

  constructor(private userService: UserService, private http: HttpClient,  private switchService: RoleSwitchService,  private router: Router, private route: ActivatedRoute) {}

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
      if (this.router.url.includes('/admin/list1')) {
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


  // onDeleteClick(user_id: string): void {
  //   if (confirm('Would you like to switch the role of this user to manager?')) {
  //     this.switchService.switchRoleTomanager(user_id).subscribe(
  //       response => {
  //         console.log('Role switched successfully: Manager', response);
          
  //         // Find the user being switched
  //         const switchedUser = this.users.find(user => user.user_id === user_id);
          
  //         if (switchedUser) {
  //           // Remove user from attendee list
  //           this.users = this.users.filter(user => user.user_id !== user_id);
            
  //           // Change role and add to managers list
  //           switchedUser.role = 'manager';
            
  //           // Manually update the manager list
  //           this.userService.fetchUsers().subscribe((data: any) => {
  //             if (Array.isArray(data)) {
  //               this.users = data.filter(user => user.role === 'user');
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
    
  // onDeleteClick(user_id: string): void {
  //   if (confirm('Would you like to switch the role of this user to manager?')) {
  //     this.isLoading = true;
  //     this.switchService.switchRoleTomanager(user_id).subscribe(
  //       response => {
  //         console.log('Role switched successfully: Manager', response);
  //         this.successMessage = 'Role switched successfully!';
  //         this.fetchUsers(); // Refresh list
  //         setTimeout(() => (this.successMessage = null), 3000); // Hide message after 3 seconds
  //       },
  //       error => {
  //         console.error('Error switching role:', error);
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  // }

//   switchToManager(user_id: string): void {
//     if (confirm('Would you like to switch the role of this user to manager?')) {
//           this.isLoading = true;
//     this.switchService.switchRoleToManager(user_id).subscribe(
//       response => {
//         console.log('User role switched to Manager:', response);
//         // Update UI accordingly (e.g., refresh the user list)
//         this.successMessage = 'Role switched successfully!';
//                 this.fetchUsers(); // Refresh list
//       },
//       error => {
//         console.error('Error switching role:', error);
//       }
//     );
//   }
// }


switchToManager(user_id: string): void {
  if (confirm('Would you like to switch the role of this user to Manager?')) {
    this.isLoading = true;
    this.switchService.switchRoleToManager(user_id).subscribe(
      response => {
        console.log('User role switched to Manager:', response);
        this.successMessage = 'Role switched successfully to Manager!';
        this.fetchUsers(); // Refresh list
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