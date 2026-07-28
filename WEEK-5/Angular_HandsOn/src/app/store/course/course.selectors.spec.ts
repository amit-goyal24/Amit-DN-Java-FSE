import {
  selectCourseState,
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError,
} from './course.selectors';
import { CourseState } from './course.reducer';
import { Course } from '../../models/course.model';

describe('Course Selectors', () => {
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

  const mockState: CourseState = {
    courses: mockCourses,
    loading: false,
    error: null,
  };

  describe('selectCourseState', () => {
    it('should select the entire course state', () => {
      const appState = { course: mockState };
      const result = selectCourseState(appState as any);

      expect(result).toEqual(mockState);
    });
  });

  describe('selectAllCourses', () => {
    it('should select all courses', () => {
      const appState = { course: mockState };
      const result = selectAllCourses(appState as any);

      expect(result).toEqual(mockCourses);
    });

    it('should return empty array when no courses', () => {
      const emptyState: CourseState = {
        courses: [],
        loading: false,
        error: null,
      };
      const appState = { course: emptyState };
      const result = selectAllCourses(appState as any);

      expect(result).toEqual([]);
    });

    it('should return correct number of courses', () => {
      const appState = { course: mockState };
      const result = selectAllCourses(appState as any);

      expect(result.length).toBe(2);
    });
  });

  describe('selectCoursesLoading', () => {
    it('should select loading state when false', () => {
      const appState = { course: mockState };
      const result = selectCoursesLoading(appState as any);

      expect(result).toBe(false);
    });

    it('should select loading state when true', () => {
      const loadingState: CourseState = {
        ...mockState,
        loading: true,
      };
      const appState = { course: loadingState };
      const result = selectCoursesLoading(appState as any);

      expect(result).toBe(true);
    });
  });

  describe('selectCoursesError', () => {
    it('should select error state when null', () => {
      const appState = { course: mockState };
      const result = selectCoursesError(appState as any);

      expect(result).toBeNull();
    });

    it('should select error state when not null', () => {
      const errorState: CourseState = {
        courses: [],
        loading: false,
        error: 'Failed to load courses',
      };
      const appState = { course: errorState };
      const result = selectCoursesError(appState as any);

      expect(result).toBe('Failed to load courses');
    });
  });
});
