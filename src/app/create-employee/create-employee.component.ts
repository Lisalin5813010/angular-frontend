import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  selectedFile: File = new File([''], 'default');
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        //console.log(data);
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      // Step 1: Upload the image
      this.employeeService.uploadImage(formData).subscribe(
        (response: any) => {
          const flag = response.data;
          // Assuming the response contains the flag
          this.employee.imageName = this.selectedFile?.name || '';
          this.employee.imageUrl = `http://localhost:8081/api/v1/files/${flag}`;
          console.log('Flag:', response.data);
          console.log('Image URL:', this.employee.imageUrl);
          // Step 2: Create the employee with the image information
          this.employeeService.createEmployee(this.employee).subscribe(() => {
            this.router.navigate(['/employees']);
          });
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  /*onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.employee.imageUrl = this.selectedFile.lastModified;
    console.log(this.employee.imageUrl);
  }*/
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.employee.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
