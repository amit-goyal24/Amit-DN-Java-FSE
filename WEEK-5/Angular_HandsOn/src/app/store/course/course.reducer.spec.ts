import { courseReducer, CourseState, initialCourseState } from './course.reducer';
import * as CourseActions from './course.actions';
import { Course } from '../../models/course.model';

describe('Course Store', () => {
  describe('CourseReducer', () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: 'Data Structures',
        code: 'CS101',
        credits: 4,
        gradeStatus: 'passed',
      },
      {
        id: 2,
        name: 'Angular Fundamentals',
        code: 'WD220',
        credits: 3,
        gradeStatus: 'pending',
      },
    ];

    it('should return initial state', () => {
      const state = courseReducer(undefined, { type: 'UNKNOWN' } as any);
      expect(state).toEqual(initialCourseState);
    });

    describe('loadCourses action', () => {
      it('should set loading to true and clear error', () => {
        const action = CourseActions.loadCourses();
        const state = courseReducer(initialCourseState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should preserve existing courses', () => {
        const existingState: CourseState = {
          courses: mockCourses,
          loading: false,
          error: null,
        };

        const action = CourseActions.loadCourses();
        const state = courseReducer(existingState, action);

        expect(state.courses).toEqual(mockCourses);
        expect(state.loading).toBe(true);
      });

      it('should clear previous error on new load', () => {
        const errorState: CourseState = {
          courses: [],
          loading: false,
          error: 'Previous error',
        };

        const action = CourseActions.loadCourses();
        const state = courseReducer(errorState, action);

        expect(state.error).toBeNull();
      });
    });

    describe('loadCoursesSuccess action', () => {
      it('should set courses and loading to false', () => {
        const action = CourseActions.loadCoursesSuccess({ courses: mockCourses });
        const state = courseReducer(initialCourseState, action);

        expect(state.courses).toEqual(mockCourses);
        expect(state.loading).toBe(false);
      });

      it('should replace existing courses', () => {
        const existingState: CourseState = {
          courses: [mockCourses[0]],
          loading: true,
          error: null,
        };

        const newCourses = [...mockCourses, { id: 3, name: 'New Course', code: 'NEW101', credits: 3, gradeStatus: 'pending' as const }];

        const action = CourseActions.loadCoursesSuccess({ courses: newCourses });
        const state = courseReducer(existingState, action);

        expect(state.courses.length).toBe(3);
        expect(state.courses).toEqual(newCourses);
      });

      it('should clear error on success', () => {
        const errorState: CourseState = {
          courses: [],
          loading: true,
          error: 'Some error',
        };

        const action = CourseActions.loadCoursesSuccess({ courses: mockCourses });
        const state = courseReducer(errorState, action);

        expect(state.error).toBeNull();
      });

      it('should maintain immutability', () => {
        const existingState = { ...initialCourseState };
        const action = CourseActions.loadCoursesSuccess({ courses: mockCourses });
        const newState = courseReducer(existingState, action);

        expect(existingState.courses).not.toEqual(mockCourses);
        expect(newState.courses).toEqual(mockCourses);
      });
    });

    describe('loadCoursesFailure action', () => {
      it('should set error and loading to false', () => {
        const errorMessage = 'Failed to fetch courses';
        const action = CourseActions.loadCoursesFailure({ error: errorMessage });
        const state = courseReducer(initialCourseState, action);

        expect(state.error).toBe(errorMessage);
        expect(state.loading).toBe(false);
      });

      it('should preserve existing courses on failure', () => {
        const existingState: CourseState = {
          courses: mockCourses,
          loading: true,
          error: null,
        };

        const action = CourseActions.loadCoursesFailure({ error: 'API error' });
        const state = courseReducer(existingState, action);

        expect(state.courses).toEqual(mockCourses);
        expect(state.error).toBe('API error');
      });

      it('should replace previous error with new one', () => {
        const errorState: CourseState = {
          courses: [],
          loading: true,
          error: 'Previous error',
        };

        const action = CourseActions.loadCoursesFailure({ error: 'New error' });
        const state = courseReducer(errorState, action);

        expect(state.error).toBe('New error');
      });
    });

    describe('Complex Scenarios', () => {
      it('should handle a complete flow: load -> success', () => {
        let state = initialCourseState;

        state = courseReducer(state, CourseActions.loadCourses());
        expect(state.loading).toBe(true);

        state = courseReducer(
          state,
          CourseActions.loadCoursesSuccess({ courses: mockCourses }),
        );
        expect(state.loading).toBe(false);
        expect(state.courses).toEqual(mockCourses);
      });

      it('should handle a complete flow: load -> failure -> retry -> success', () => {
        let state = initialCourseState;

        state = courseReducer(state, CourseActions.loadCourses());
        expect(state.loading).toBe(true);

        state = courseReducer(
          state,
          CourseActions.loadCoursesFailure({ error: 'Network error' }),
        );
        expect(state.error).toBe('Network error');
        expect(state.loading).toBe(false);

        state = courseReducer(state, CourseActions.loadCourses());
        expect(state.error).toBeNull();

        state = courseReducer(
          state,
          CourseActions.loadCoursesSuccess({ courses: mockCourses }),
        );
        expect(state.courses).toEqual(mockCourses);
      });

      it('should handle empty course list', () => {
        const action = CourseActions.loadCoursesSuccess({ courses: [] });
        const state = courseReducer(initialCourseState, action);

        expect(state.courses).toEqual([]);
        expect(state.loading).toBe(false);
      });
    });
  });
});
