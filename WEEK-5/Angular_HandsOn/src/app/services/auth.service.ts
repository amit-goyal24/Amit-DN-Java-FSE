import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true; // Change to false to verify redirect behaviour.
}
