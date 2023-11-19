import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { Employee } from '../../interfaces/Employee.interface';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-explorer',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  providers: [EmployeesService],
  templateUrl: './employee-explorer.component.html',
  styleUrl: './employee-explorer.component.scss'
})
export class EmployeeExplorerComponent {
  constructor(private employeesService: EmployeesService) { }

  public employees: Employee[] = [];
  public message: string = "";
  public hasMessage: boolean = false;

  private page: number = 0;
  private isLoading: boolean = false;
  private searchTerm: string = "";

  public searchEmployees = (searchTerm: string, page: number = 0) => this.employeesService.getEmployees(searchTerm, page);

  public showEmployee(employee: Employee) {
    this.employees = [employee];
    this.isLoading = true;
    this.hasMessage = false;
  }

  private clearEmployees() {
    this.isLoading = true;
    this.employees = [];
    this.setMessage("cannot search for empty value");
  }

  private setMessage(message: string) {
    this.hasMessage = true;
    this.message = message;
  }

  public showEmployees(searchTerm: string) {
    if (searchTerm == null || searchTerm == "") {
      this.clearEmployees();
      return;
    }

    this.searchTerm = searchTerm;
    this.page = 0;
    this.isLoading = false;
    this.hasMessage = false;

    this.searchEmployees(searchTerm, this.page).subscribe(employees => {
      this.employees = employees;
      const noResutls = employees.length == 0;
      this.isLoading = noResutls;
      if (noResutls) {
        this.setMessage("no results");
      }
    });
  }

  public loadEmployeesOnScroll(target) {
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollLimit = (scrollHeight - clientHeight) * 0.8;

    if (scrollTop >= scrollLimit && !this.isLoading) {
      this.page++;
      this.searchEmployees(this.searchTerm, this.page).subscribe(employees => {
        this.isLoading = employees.length == 0;
        this.employees.push(...employees);
      });
    }
  }
}
