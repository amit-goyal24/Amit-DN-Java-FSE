import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as CourseActions from '../../store/course/course.actions';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { Router } from '@angular/router';

describe('CourseList Component with MockStore', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  let router: Router;

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

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null,
    },
    enrollment: {
      enrolledCourseIds: [1, 3],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    store.resetSelectors();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize observables from store', (done) => {
      fixture.detectChanges();

      component.courses$.subscribe((courses) => {
        expect(courses).toEqual(mockCourses);
        done();
      });
    });

    it('should dispatch loadCourses on init', () => {
      spyOn(store, 'dispatch');
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(CourseActions.loadCourses());
    });
  });

  describe('Store Selectors', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should select all courses from store', (done) => {
      component.courses$.subscribe((courses) => {
        expect(courses).toEqual(mockCourses);
        expect(courses.length).toBe(3);
        done();
      });
    });

    it('should select loading state from store', (done) => {
      component.loading$.subscribe((loading) => {
        expect(loading).toBe(false);
        done();
      });
    });

    it('should select error state from store', (done) => {
      component.error$.subscribe((error) => {
        expect(error).toBeNull();
        done();
      });
    });

    it('should select enrolled IDs from store', (done) => {
      component.enrolledIds$.subscribe((ids) => {
        expect(ids).toEqual([1, 3]);
        done();
      });
    });
  });

  describe('Enrollment Management', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should dispatch enrollInCourse when enrolling', () => {
      spyOn(store, 'dispatch');

      component.onEnroll(2, false);

      expect(store.dispatch).toHaveBeenCalledWith(
        EnrollmentActions.enrollInCourse({ courseId: 2 }),
      );
    });

    it('should dispatch unenrollFromCourse when unenrolling', () => {
      spyOn(store, 'dispatch');

      component.onEnroll(1, true);

      expect(store.dispatch).toHaveBeenCalledWith(
        EnrollmentActions.unenrollFromCourse({ courseId: 1 }),
      );
    });

    it('should set selectedCourseId when enrolling/unenrolling', () => {
      component.onEnroll(2, false);

      expect(component.selectedCourseId).toBe(2);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should navigate to course detail on open', () => {
      spyOn(router, 'navigate');

      component.open(1);

      expect(router.navigate).toHaveBeenCalledWith(['courses', 1]);
    });

    it('should navigate to correct course ID', () => {
      spyOn(router, 'navigate');

      component.open(3);

      expect(router.navigate).toHaveBeenCalledWith(['courses', 3]);
    });
  });

  describe('TrackBy Function', () => {
    it('should provide correct trackBy function', () => {
      const result = component.trackByCourseId(0, mockCourses[0]);

      expect(result).toBe(1);
    });

    it('should return unique ID for each course', () => {
      const id1 = component.trackByCourseId(0, mockCourses[0]);
      const id2 = component.trackByCourseId(1, mockCourses[1]);

      expect(id1).not.toBe(id2);
    });
  });

  describe('Loading and Error States', () => {
    it('should show loading state when loading is true', (done) => {
      store.setState({
        course: {
          courses: [],
          loading: true,
          error: null,
        },
        enrollment: {
          enrolledCourseIds: [],
        },
      });

      fixture.detectChanges();

      component.loading$.subscribe((loading) => {
        expect(loading).toBe(true);
        done();
      });
    });

    it('should show error state when error exists', (done) => {
      store.setState({
        course: {
          courses: [],
          loading: false,
          error: 'Failed to load courses',
        },
        enrollment: {
          enrolledCourseIds: [],
        },
      });

      fixture.detectChanges();

      component.error$.subscribe((error) => {
        expect(error).toBe('Failed to load courses');
        done();
      });
    });
  });

  describe('Store Dispatch', () => {
    it('should dispatch actions correctly', () => {
      spyOn(store, 'dispatch');

      store.dispatch(CourseActions.loadCourses());
      store.dispatch(EnrollmentActions.enrollInCourse({ courseId: 1 }));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple enrollments', () => {
      spyOn(store, 'dispatch');

      component.onEnroll(1, false);
      component.onEnroll(2, false);
      component.onEnroll(3, false);

      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
