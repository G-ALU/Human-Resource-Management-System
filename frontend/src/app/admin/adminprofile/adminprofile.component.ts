import { Component } from '@angular/core';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { footer3Component } from '../footer3/footer3.component';
import { CommonModule } from '@angular/common';
import { FormsModule , NgForm} from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { TokenDetails } from '../../interfaces/User';

@Component({
  selector: 'app-adminprofile',
  standalone: true,
  imports: [Sidebar3Component,footer3Component, CommonModule, FormsModule],
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.css'
})
export class AdminprofileComponent {

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
