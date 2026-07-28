import { HttpInterceptorFn } from '@angular/common/http';

/**
 * AuthInterceptor: Adds authorization token to all HTTP requests
 * Sets a Bearer token in the Authorization header for authenticated API calls
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'mocktoken-12345'; // In production, retrieve from AuthService or TokenService

  // Clone the request and set the Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.debug(`Auth interceptor: Added authorization header to ${req.url}`);
  return next(authReq);
};

