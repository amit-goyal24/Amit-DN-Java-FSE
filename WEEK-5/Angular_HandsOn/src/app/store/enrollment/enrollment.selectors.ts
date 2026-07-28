import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

/**
 * Feature selector for enrollment state
 */
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

/**
 * Selector: All enrolled course IDs
 */
export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state.enrolledCourseIds,
);

/**
 * Selector: Enrolled courses (combines enrollment IDs with course data)
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((course) => enrolledIds.includes(course.id)),
);

