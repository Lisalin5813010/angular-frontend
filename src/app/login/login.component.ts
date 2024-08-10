import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private userServices: UserService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit() {
    this.userServices.loginUser(this.user).subscribe(
      (response: Object) => {
        // Assuming the backend returns the JWT token as a string
        if (response) {
          // Store the token in localStorage
          localStorage.setItem('jwtToken', response.toString());
          this.goToEmployeeList(); // Navigate to employee list
        } else {
          console.error('Login failed');
        }
      },
      (error) => console.log(error)
    );
  }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
