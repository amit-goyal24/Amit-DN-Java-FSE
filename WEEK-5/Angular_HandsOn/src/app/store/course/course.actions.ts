import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

/**
 * CourseActions: Actions for managing course state
 */

/**
 * Initiate loading of all courses from API
 */
export const loadCourses = createAction(
  '[Course] Load Courses',
);

/**
 * Successfully loaded courses from API
 */
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>(),
);

/**
 * Failed to load courses from API
 */
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>(),
);

