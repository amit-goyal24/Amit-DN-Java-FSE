import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course, SAMPLE_COURSES } from '../models/course.model';
@Injectable({providedIn:'root'})
export class CourseService {
 private readonly apiUrl='http://localhost:3000/courses'; constructor(private http:HttpClient) {}
 getCourses():Observable<Course[]> { return this.http.get<Course[]>(this.apiUrl).pipe(map(x=>x.filter(c=>(c.credits??0)>0)),tap(x=>console.log('Courses loaded:',x.length)),retry(2),catchError(e=>{console.error(e);return of(SAMPLE_COURSES);})); }
 getCourseById(id:number):Observable<Course|undefined>{return this.getCourses().pipe(map(x=>x.find(c=>c.id===id)));}
 createCourse(course:Omit<Course,'id'>):Observable<Course>{return this.http.post<Course>(this.apiUrl,course);}
 updateCourse(course:Course):Observable<Course>{return this.http.put<Course>(`${this.apiUrl}/${course.id}`,course);}
 deleteCourse(id:number):Observable<void>{return this.http.delete<void>(`${this.apiUrl}/${id}`);}
}
