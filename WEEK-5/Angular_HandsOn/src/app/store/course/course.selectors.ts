import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

/**
 * Feature selector for course state
 */
export const selectCourseState = createFeatureSelector<CourseState>('course');

/**
 * Selector: All courses
 */
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses,
);

/**
 * Selector: Loading state
 */
export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading,
);

/**
 * Selector: Error state
 */
export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error,
);

