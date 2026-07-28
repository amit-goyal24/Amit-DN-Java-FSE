import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * ErrorHandlerInterceptor: Handles HTTP errors globally
 * - 401: Unauthorized - redirects to home
 * - 5xx: Server errors - logs error message
 * - Other errors: Passes through for component-level handling
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle unauthorized access
      if (error.status === 401) {
        console.error('Authentication required. Redirecting to home.');
        router.navigateByUrl('/');
      }

      // Handle server errors
      if (error.status >= 500) {
        console.error(`Server error (${error.status}): ${error.statusText}. Please try again.`);
      }

      // Handle client errors
      if (error.status >= 400 && error.status < 500 && error.status !== 401) {
        console.warn(`Client error (${error.status}): ${error.message}`);
      }

      // Re-throw error for component-level handling
      return throwError(() => error);
    }),
  );
};

