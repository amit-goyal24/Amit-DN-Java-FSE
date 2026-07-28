import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import * as CourseActions from './course.actions';

/**
 * CourseEffects: Side effects for course state management
 * Handles async operations like API calls
 */
@Injectable()
export class CourseEffects {
  private readonly actions$ = inject(Actions);
  private readonly courseService = inject(CourseService);

  /**
   * Effect: Load courses from API
   * Listens for loadCourses action and:
   * - Calls CourseService.getCourses()
   * - Dispatches loadCoursesSuccess on success
   * - Dispatches loadCoursesFailure on error
   */
  readonly loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}

