import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as EnrollmentActions from './enrollment.actions';

/**
 * EnrollmentEffects: Side effects for enrollment state management
 * Currently handles basic actions. Can be extended to handle persistence
 * to backend/localStorage
 */
@Injectable()
export class EnrollmentEffects {
  private readonly actions$ = inject(Actions);

  // Example effect - can be extended for API calls or localStorage
  // trackEnrollmentChanges$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(EnrollmentActions.enrollInCourse, EnrollmentActions.unenrollFromCourse),
  //     map(action => {
  //       console.log('Enrollment changed:', action);
  //       // Could save to localStorage or make API call here
  //       return action;
  //     })
  //   ),
  //   { dispatch: false }
  // );
}
