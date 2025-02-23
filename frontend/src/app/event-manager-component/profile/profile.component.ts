import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { Sidebar2Component } from "../sidebar-2/sidebar-2.component";
import { Navbar2Component } from '../navbar2/navbar2.component';
import { CommonModule } from '@angular/common';
import { FormsModule , NgForm} from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { TokenDetails } from '../../interfaces/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Footer2Component, Sidebar2Component, Navbar2Component, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  user = {
    email: '',
    password: ''
  };

  errorMessages = {
    email: '',
    password: '',
    general: ''
  };

  updateSuccess: boolean = false;
  successMessage = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  onSaveChanges(form: NgForm) {
    if (form.invalid) {
      this.errorMessages.email = this.getEmailErrorMessage(form.controls['email']);
      this.errorMessages.password = this.getPasswordErrorMessage(form.controls['password']);
      this.setErrorTimeout();
      return;
    }

    this.profileService.updateUserProfile(this.user.email, this.user.password).subscribe(
      (response: TokenDetails) => {
        if (response.message === 'Account Updated successfully') {
          this.updateSuccess = true;
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
        } else {
          this.errorMessages.general = response.message || 'Failed to update profile. Please try again.';
          this.setErrorTimeout();
        }
      },
      (error) => {
        this.errorMessages.general = 'Server error. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  getEmailErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Email is required.';
    }
    if (control.errors?.email) {
      return 'Invalid email address.';
    }
    return '';
  }

  getPasswordErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Password is required.';
    }
    return '';
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.errorMessages.email = '';
      this.errorMessages.password = '';
      this.errorMessages.general = '';
    }, 2000);
}

}
