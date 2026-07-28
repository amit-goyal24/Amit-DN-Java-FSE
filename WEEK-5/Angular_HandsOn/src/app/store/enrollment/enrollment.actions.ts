import { createAction, props } from '@ngrx/store';

/**
 * EnrollmentActions: Actions for managing course enrollment state
 */

/**
 * Enroll in a course by ID
 */
export const enrollInCourse = createAction(
  '[Enrollment] Enroll in Course',
  props<{ courseId: number }>(),
);

/**
 * Unenroll from a course by ID
 */
export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll from Course',
  props<{ courseId: number }>(),
);

/**
 * Set the entire list of enrolled courses
 */
export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courseIds: number[] }>(),
);

