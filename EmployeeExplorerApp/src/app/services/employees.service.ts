import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/Employee.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(searchTerm:string, page:number = 0):Observable<Employee[]> {
    const options = ({  
      params: {
        searchTerm: searchTerm,
        page: page
      }
    });

    //TODO: take http path from configs.
    //TODO: use cache with key: searchTerm + page number, update cache all 5 min.
    return this.http.get<Employee[]>('https://localhost:44396/Employee', options);
  }
}

