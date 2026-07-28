import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

/**
 * EnrollmentState: Tracks course enrollment IDs for the current student
 */
export interface EnrollmentState {
  enrolledCourseIds: number[];
}

const initialState: EnrollmentState = {
  enrolledCourseIds: [],
};

/**
 * EnrollmentReducer: Handles enrollment state mutations
 * - enrollInCourse: Adds course ID to enrolledCourseIds (prevents duplicates)
 * - unenrollFromCourse: Removes course ID from enrolledCourseIds
 * - setEnrolledCourses: Replaces entire enrolled courses list
 */
export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: [...new Set([...state.enrolledCourseIds, courseId])],
  })),
  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),
  on(EnrollmentActions.setEnrolledCourses, (_, { courseIds }) => ({
    enrolledCourseIds: courseIds,
  })),
);

