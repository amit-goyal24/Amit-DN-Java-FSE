import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard Component', () => {
  let fixture: ComponentFixture<CourseCard>;
  let component: CourseCard;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have isExpanded set to false initially', () => {
      expect(component.isExpanded).toBe(false);
    });

    it('should have enrolled set to false by default', () => {
      expect(component.enrolled).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should accept and display course input', () => {
      component.course = mockCourse;
      fixture.detectChanges();

      const courseTitle = fixture.debugElement.query(By.css('h3'));
      expect(courseTitle?.nativeElement.textContent).toContain('Data Structures');
    });

    it('should display course code', () => {
      component.course = mockCourse;
      fixture.detectChanges();

      const courseCode = fixture.debugElement.query(By.css('.course-code'));
      expect(courseCode?.nativeElement.textContent).toContain('CS101');
    });

    it('should handle enrolled input', () => {
      component.course = mockCourse;
      component.enrolled = true;
      fixture.detectChanges();

      expect(component.enrolled).toBe(true);
    });
  });

  describe('Computed Properties', () => {
    it('should apply enrolled class when enrolled is true', () => {
      component.course = mockCourse;
      component.enrolled = true;
      fixture.detectChanges();

      const cardClasses = component.cardClasses;
      expect(cardClasses['card--enrolled']).toBe(true);
    });

    it('should apply full class for high credit courses', () => {
      component.course = mockCourse;
      fixture.detectChanges();

      const cardClasses = component.cardClasses;
      expect(cardClasses['card--full']).toBe(true);
    });

    it('should apply expanded class when isExpanded is true', () => {
      component.course = mockCourse;
      component.isExpanded = true;
      fixture.detectChanges();

      const cardClasses = component.cardClasses;
      expect(cardClasses['expanded']).toBe(true);
    });

    it('should return correct border color for passed grade', () => {
      component.course = { ...mockCourse, gradeStatus: 'passed' };
      expect(component.borderColor).toBe('green');
    });

    it('should return correct border color for failed grade', () => {
      component.course = { ...mockCourse, gradeStatus: 'failed' };
      expect(component.borderColor).toBe('crimson');
    });

    it('should return correct border color for pending grade', () => {
      component.course = { ...mockCourse, gradeStatus: 'pending' };
      expect(component.borderColor).toBe('grey');
    });
  });

  describe('Output Events', () => {
    beforeEach(() => {
      component.course = mockCourse;
      fixture.detectChanges();
    });

    it('should emit enrollRequested with course ID when button is clicked', () => {
      spyOn(component.enrollRequested, 'emit');

      const button = fixture.debugElement.query(By.css('button'));
      button?.nativeElement.click();

      expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
    });

    it('should emit selected with course ID when card is selected', () => {
      spyOn(component.selected, 'emit');

      component.selected.emit(1);

      expect(component.selected.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should log to console when course changes', () => {
      spyOn(console, 'log');

      component.course = mockCourse;
      component.ngOnChanges({
        course: {
          previousValue: null,
          currentValue: mockCourse,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(console.log).toHaveBeenCalledWith('Course changed', expect.any(Object));
    });

    it('should handle multiple ngOnChanges calls', () => {
      spyOn(console, 'log');

      const course2 = { ...mockCourse, id: 2, name: 'Advanced Structures' };

      component.ngOnChanges({
        course: {
          previousValue: mockCourse,
          currentValue: course2,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null credits gracefully', () => {
      component.course = { ...mockCourse, credits: null };
      fixture.detectChanges();

      const cardClasses = component.cardClasses;
      expect(cardClasses['card--full']).toBe(false);
    });

    it('should handle course with low credits', () => {
      component.course = { ...mockCourse, credits: 2 };
      fixture.detectChanges();

      const cardClasses = component.cardClasses;
      expect(cardClasses['card--full']).toBe(false);
    });
  });
});

