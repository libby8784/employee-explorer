import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EmployeesService } from './services/employees.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  provideHttpClient(withFetch())]
};
