import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard: Verifies user authentication before allowing access to protected routes.
 * If not authenticated, redirects to home page.
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    console.log(`✓ Auth guard: Access granted to ${state.url}`);
    return true;
  }

  console.warn(`✗ Auth guard: Access denied to ${state.url} - redirecting to /`);
  return router.createUrlTree(['/']);
};
