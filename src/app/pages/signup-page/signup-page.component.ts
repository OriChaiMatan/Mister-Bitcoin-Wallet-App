import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  name: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSignup(event: Event) {
    event.preventDefault();
    if (this.name.trim()) {
      this.userService.signup(this.name);
      this.router.navigate(['/']); // Redirect to home or another route after signup
    }
  }
}
