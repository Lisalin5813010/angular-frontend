import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(private userService: UserService, private router: Router) {}

  // Method to handle logout
  logout(): void {
    this.userService.logout(); // Call the logout method from UserService
    //console.log('token is :' + localStorage.getItem('jwtToken'));
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}
