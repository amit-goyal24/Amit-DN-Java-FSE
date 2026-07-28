import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

/**
 * CourseState: Manages course data, loading, and error states
 */
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

/**
 * CourseReducer: Handles course state mutations
 * - loadCourses: Sets loading to true, clears previous errors
 * - loadCoursesSuccess: Stores courses, sets loading to false
 * - loadCoursesFailure: Captures error message, sets loading to false
 */
export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

