import {
  selectEnrollmentState,
  selectEnrolledIds,
  selectEnrolledCourses,
} from './enrollment.selectors';
import { EnrollmentState } from './enrollment.reducer';
import { Course } from '../../models/course.model';

describe('Enrollment Selectors', () => {
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
    {
      id: 3,
      name: 'Database Systems',
      code: 'DB310',
      credits: 3,
      gradeStatus: 'failed',
    },
  ];

  const mockEnrollmentState: EnrollmentState = {
    enrolledCourseIds: [1, 3],
  };

  describe('selectEnrollmentState', () => {
    it('should select the entire enrollment state', () => {
      const appState = { enrollment: mockEnrollmentState };
      const result = selectEnrollmentState(appState as any);

      expect(result).toEqual(mockEnrollmentState);
    });
  });

  describe('selectEnrolledIds', () => {
    it('should select enrolled course IDs', () => {
      const appState = { enrollment: mockEnrollmentState };
      const result = selectEnrolledIds(appState as any);

      expect(result).toEqual([1, 3]);
    });

    it('should return empty array when no courses enrolled', () => {
      const emptyState: EnrollmentState = {
        enrolledCourseIds: [],
      };
      const appState = { enrollment: emptyState };
      const result = selectEnrolledIds(appState as any);

      expect(result).toEqual([]);
    });

    it('should return correct number of enrolled IDs', () => {
      const appState = { enrollment: mockEnrollmentState };
      const result = selectEnrolledIds(appState as any);

      expect(result.length).toBe(2);
    });
  });

  describe('selectEnrolledCourses', () => {
    it('should select enrolled courses based on IDs', () => {
      const appState = {
        course: { courses: mockCourses, loading: false, error: null },
        enrollment: mockEnrollmentState,
      };
      const result = selectEnrolledCourses(appState as any);

      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(3);
    });

    it('should return empty array when no courses enrolled', () => {
      const emptyEnrollmentState: EnrollmentState = {
        enrolledCourseIds: [],
      };
      const appState = {
        course: { courses: mockCourses, loading: false, error: null },
        enrollment: emptyEnrollmentState,
      };
      const result = selectEnrolledCourses(appState as any);

      expect(result).toEqual([]);
    });

    it('should return correct course details', () => {
      const appState = {
        course: { courses: mockCourses, loading: false, error: null },
        enrollment: mockEnrollmentState,
      };
      const result = selectEnrolledCourses(appState as any);

      expect(result[0].name).toBe('Data Structures');
      expect(result[1].name).toBe('Database Systems');
    });

    it('should filter only enrolled courses', () => {
      const appState = {
        course: { courses: mockCourses, loading: false, error: null },
        enrollment: mockEnrollmentState,
      };
      const result = selectEnrolledCourses(appState as any);

      // Should only return courses with IDs 1 and 3, not 2
      expect(result.find((c) => c.id === 2)).toBeUndefined();
    });

    it('should handle when enrolled ID does not exist in courses', () => {
      const enrollmentWithNonExistentId: EnrollmentState = {
        enrolledCourseIds: [1, 999],
      };
      const appState = {
        course: { courses: mockCourses, loading: false, error: null },
        enrollment: enrollmentWithNonExistentId,
      };
      const result = selectEnrolledCourses(appState as any);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });
  });
});
