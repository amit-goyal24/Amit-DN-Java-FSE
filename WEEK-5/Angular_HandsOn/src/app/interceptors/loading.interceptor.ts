import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * LoadingInterceptor: Manages loading state for HTTP requests
 * - Sets loading$ to true when request starts
 * - Sets loading$ to false when request completes (success or error)
 * Used by GlobalSpinner component to display overlay
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  console.debug(`Loading interceptor: Starting request to ${req.url}`);
  loadingService.isLoading$.next(true);

  return next(req).pipe(
    finalize(() => {
      console.debug(`Loading interceptor: Completed request to ${req.url}`);
      loadingService.isLoading$.next(false);
    }),
  );
};

