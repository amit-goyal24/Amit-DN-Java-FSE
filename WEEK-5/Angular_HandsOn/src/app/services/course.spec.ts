import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course, SAMPLE_COURSES } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let http: HttpTestingController;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 3,
      gradeStatus: 'passed',
    },
    {
      id: 2,
      name: 'Angular Fundamentals',
      code: 'WD220',
      credits: 4,
      gradeStatus: 'pending',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CourseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  describe('getCourses()', () => {
    it('should fetch courses from API', () => {
      service.getCourses().subscribe((courses) => {
        expect(courses.length).toBe(2);
        expect(courses[0].name).toBe('Data Structures');
      });

      const req = http.expectOne('http://localhost:3000/courses');
      expect(req.request.method).toBe('GET');
      req.flush(mockCourses);
    });

    it('should filter out courses with zero or null credits', () => {
      const coursesWithZeroCredits = [
        ...mockCourses,
        { id: 3, name: 'No Credit', code: 'NC100', credits: 0, gradeStatus: 'pending' as const },
        { id: 4, name: 'Null Credit', code: 'NC101', credits: null, gradeStatus: 'pending' as const },
      ];

      service.getCourses().subscribe((courses) => {
        expect(courses.length).toBe(2);
        expect(courses.every((c) => (c.credits ?? 0) > 0)).toBe(true);
      });

      const req = http.expectOne('http://localhost:3000/courses');
      req.flush(coursesWithZeroCredits);
    });

    it('should log loaded courses', () => {
      spyOn(console, 'log');

      service.getCourses().subscribe(() => {
        expect(console.log).toHaveBeenCalledWith('Courses loaded:', 2);
      });

      const req = http.expectOne('http://localhost:3000/courses');
      req.flush(mockCourses);
    });

    it('should retry failed requests', () => {
      service.getCourses().subscribe();

      const req1 = http.expectOne('http://localhost:3000/courses');
      req1.error(new ErrorEvent('Network error'));

      const req2 = http.expectOne('http://localhost:3000/courses');
      req2.error(new ErrorEvent('Network error'));

      const req3 = http.expectOne('http://localhost:3000/courses');
      req3.flush(mockCourses);
    });

    it('should return sample courses on error after retries', (done) => {
      service.getCourses().subscribe({
        next: (courses) => {
          expect(courses).toEqual(SAMPLE_COURSES);
          done();
        },
      });

      // Fail all retry attempts
      for (let i = 0; i < 3; i++) {
        const req = http.expectOne('http://localhost:3000/courses');
        req.error(new ErrorEvent('Network error'));
      }
    });
  });

  describe('getCourseById()', () => {
    it('should fetch a specific course by ID', () => {
      service.getCourseById(1).subscribe((course) => {
        expect(course?.id).toBe(1);
        expect(course?.name).toBe('Data Structures');
      });

      const req = http.expectOne('http://localhost:3000/courses');
      req.flush(mockCourses);
    });

    it('should return undefined if course not found', () => {
      service.getCourseById(999).subscribe((course) => {
        expect(course).toBeUndefined();
      });

      const req = http.expectOne('http://localhost:3000/courses');
      req.flush(mockCourses);
    });
  });

  describe('createCourse()', () => {
    it('should send POST request to create a course', () => {
      const newCourse = { name: 'New Course', code: 'NEW101', credits: 3, gradeStatus: 'pending' as const };

      service.createCourse(newCourse).subscribe((course) => {
        expect(course.id).toBe(5);
        expect(course.name).toBe('New Course');
      });

      const req = http.expectOne('http://localhost:3000/courses');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCourse);
      req.flush({ ...newCourse, id: 5 });
    });
  });

  describe('updateCourse()', () => {
    it('should send PUT request to update a course', () => {
      const updatedCourse = {
        ...mockCourses[0],
        name: 'Updated Data Structures',
      };

      service.updateCourse(updatedCourse).subscribe((course) => {
        expect(course.name).toBe('Updated Data Structures');
      });

      const req = http.expectOne(`http://localhost:3000/courses/${updatedCourse.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedCourse);
      req.flush(updatedCourse);
    });
  });

  describe('deleteCourse()', () => {
    it('should send DELETE request to remove a course', () => {
      service.deleteCourse(1).subscribe(() => {
        expect(true).toBe(true); // Just verify the subscription completes
      });

      const req = http.expectOne('http://localhost:3000/courses/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Error Handling', () => {
    it('should log errors when API call fails', (done) => {
      spyOn(console, 'error');

      service.getCourses().subscribe(() => {
        expect(console.error).toHaveBeenCalled();
        done();
      });

      // Fail all attempts
      for (let i = 0; i < 3; i++) {
        const req = http.expectOne('http://localhost:3000/courses');
        req.error(new ErrorEvent('API Error'));
      }
    });
  });
});

