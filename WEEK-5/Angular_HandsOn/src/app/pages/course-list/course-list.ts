import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
@Component({ selector:'app-course-list', imports:[AsyncPipe,NgFor,NgIf,CourseCard,Highlight], templateUrl:'./course-list.html', styleUrl:'./course-list.css' })
export class CourseList implements OnInit {
  courses$!: Observable<Course[]>; loading$!: Observable<boolean>; error$!: Observable<string | null>; enrolledIds$!: Observable<number[]>; selectedCourseId?:number;
  constructor(private store:Store, private router:Router) { this.courses$ = store.select(selectAllCourses); this.loading$ = store.select(selectCoursesLoading); this.error$ = store.select(selectCoursesError); this.enrolledIds$ = store.select(selectEnrolledIds); }
  ngOnInit():void { this.store.dispatch(loadCourses()); }
  trackByCourseId=(_:number,course:Course)=>course.id;
  onEnroll(id:number, enrolled:boolean):void { this.selectedCourseId=id; this.store.dispatch(enrolled ? unenrollFromCourse({courseId:id}) : enrollInCourse({courseId:id})); }
  open(id:number):void { this.router.navigate(['courses',id]); }
}
