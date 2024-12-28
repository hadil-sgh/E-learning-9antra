import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Course } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8089/api/Courses';

  constructor(private http: HttpClient) {}

  addCourse(course: Course, image: File): Observable<Course> {
    const formData: FormData = new FormData();
    formData.append('course', JSON.stringify(course));
    formData.append('image', image, image.name);

    return this.http.post<Course>(`${this.apiUrl}/add`, formData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateCourse(id: number, course: Course, image: File | null): Observable<Course> {
    const formData: FormData = new FormData();
    if (course) formData.append('course', JSON.stringify(course));
    if (image) formData.append('image', image, image.name);

    return this.http.put<Course>(`${this.apiUrl}/update/${id}`, formData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/all`);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}