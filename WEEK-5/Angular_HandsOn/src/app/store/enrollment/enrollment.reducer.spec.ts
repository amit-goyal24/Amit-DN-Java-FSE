import { enrollmentReducer, EnrollmentState } from './enrollment.reducer';
import * as EnrollmentActions from './enrollment.actions';

describe('Enrollment Store', () => {
  describe('EnrollmentReducer', () => {
    const initialState: EnrollmentState = {
      enrolledCourseIds: [],
    };

    it('should return initial state', () => {
      const state = enrollmentReducer(undefined, { type: 'UNKNOWN' } as any);
      expect(state).toEqual(initialState);
    });

    describe('enrollInCourse action', () => {
      it('should add a course ID to enrolledCourseIds', () => {
        const action = EnrollmentActions.enrollInCourse({ courseId: 1 });
        const state = enrollmentReducer(initialState, action);

        expect(state.enrolledCourseIds).toContain(1);
      });

      it('should not add duplicate course IDs', () => {
        const stateWithOne = {
          enrolledCourseIds: [1, 2, 3],
        };

        const action = EnrollmentActions.enrollInCourse({ courseId: 2 });
        const state = enrollmentReducer(stateWithOne, action);

        expect(state.enrolledCourseIds).toEqual([1, 2, 3]);
      });

      it('should handle multiple enrollments', () => {
        let state = initialState;

        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 1 }),
        );
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 2 }),
        );
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 3 }),
        );

        expect(state.enrolledCourseIds).toEqual([1, 2, 3]);
      });

      it('should maintain immutability', () => {
        const originalState = { enrolledCourseIds: [1, 2] };
        const action = EnrollmentActions.enrollInCourse({ courseId: 3 });
        const newState = enrollmentReducer(originalState, action);

        expect(originalState).toEqual({ enrolledCourseIds: [1, 2] });
        expect(newState.enrolledCourseIds).toContain(3);
      });
    });

    describe('unenrollFromCourse action', () => {
      it('should remove a course ID from enrolledCourseIds', () => {
        const stateWithCourses = {
          enrolledCourseIds: [1, 2, 3],
        };

        const action = EnrollmentActions.unenrollFromCourse({ courseId: 2 });
        const state = enrollmentReducer(stateWithCourses, action);

        expect(state.enrolledCourseIds).toEqual([1, 3]);
      });

      it('should handle removing non-existent course ID gracefully', () => {
        const stateWithCourses = {
          enrolledCourseIds: [1, 2, 3],
        };

        const action = EnrollmentActions.unenrollFromCourse({ courseId: 999 });
        const state = enrollmentReducer(stateWithCourses, action);

        expect(state.enrolledCourseIds).toEqual([1, 2, 3]);
      });

      it('should handle removing from empty list', () => {
        const action = EnrollmentActions.unenrollFromCourse({ courseId: 1 });
        const state = enrollmentReducer(initialState, action);

        expect(state.enrolledCourseIds).toEqual([]);
      });
    });

    describe('setEnrolledCourses action', () => {
      it('should replace entire enrolled courses list', () => {
        const stateWithCourses = {
          enrolledCourseIds: [1, 2, 3],
        };

        const action = EnrollmentActions.setEnrolledCourses({
          courseIds: [4, 5, 6],
        });
        const state = enrollmentReducer(stateWithCourses, action);

        expect(state.enrolledCourseIds).toEqual([4, 5, 6]);
      });

      it('should handle empty course list', () => {
        const stateWithCourses = {
          enrolledCourseIds: [1, 2, 3],
        };

        const action = EnrollmentActions.setEnrolledCourses({ courseIds: [] });
        const state = enrollmentReducer(stateWithCourses, action);

        expect(state.enrolledCourseIds).toEqual([]);
      });

      it('should replace previous state entirely', () => {
        const stateWithCourses = {
          enrolledCourseIds: [1, 2, 3, 4, 5],
        };

        const action = EnrollmentActions.setEnrolledCourses({
          courseIds: [10, 20],
        });
        const state = enrollmentReducer(stateWithCourses, action);

        expect(state.enrolledCourseIds.length).toBe(2);
        expect(state.enrolledCourseIds).toEqual([10, 20]);
      });
    });

    describe('Complex Scenarios', () => {
      it('should handle a sequence of actions', () => {
        let state = initialState;

        // Enroll in courses 1, 2, 3
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 1 }),
        );
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 2 }),
        );
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 3 }),
        );

        expect(state.enrolledCourseIds).toEqual([1, 2, 3]);

        // Unenroll from course 2
        state = enrollmentReducer(
          state,
          EnrollmentActions.unenrollFromCourse({ courseId: 2 }),
        );

        expect(state.enrolledCourseIds).toEqual([1, 3]);

        // Enroll in course 4
        state = enrollmentReducer(
          state,
          EnrollmentActions.enrollInCourse({ courseId: 4 }),
        );

        expect(state.enrolledCourseIds).toEqual([1, 3, 4]);

        // Reset with new set
        state = enrollmentReducer(
          state,
          EnrollmentActions.setEnrolledCourses({ courseIds: [5, 6] }),
        );

        expect(state.enrolledCourseIds).toEqual([5, 6]);
      });

      it('should handle large number of enrollments', () => {
        let state = initialState;

        for (let i = 1; i <= 100; i++) {
          state = enrollmentReducer(
            state,
            EnrollmentActions.enrollInCourse({ courseId: i }),
          );
        }

        expect(state.enrolledCourseIds.length).toBe(100);
        expect(state.enrolledCourseIds[0]).toBe(1);
        expect(state.enrolledCourseIds[99]).toBe(100);
      });
    });
  });
});
