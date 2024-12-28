import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient,private route:Route) { }

   private baseUrl = 'http://localhost:8080/api/courses';











}
