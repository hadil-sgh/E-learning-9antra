import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  course: Course = new Course();
  selectedImage: File | null = null;
  editMode: boolean = false;
  courseIdToEdit: number | null = null; // Explicitly typed as `number | null`

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
    if (this.editMode && this.courseIdToEdit !== null) {
      // Handle update operation
      this.courseService
        .updateCourse(this.courseIdToEdit, this.course, this.selectedImage)
        .subscribe(
          (updatedCourse) => {
            this.loadCourses();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating course', error);
          }
        );
    } else {
      // Handle add operation
      if (this.selectedImage) {  // Ensure image is selected before submitting
        this.courseService.addCourse(this.course, this.selectedImage).subscribe(
          (newCourse) => {
            this.loadCourses();
            this.resetForm();
          },
          (error) => {
            console.error('Error adding course', error);
          }
        );
      } else {
        console.error('No image selected.');
      }
    }
  }

  // editCourse(course: Course): void {
  //   this.course = { ...course };  // Spread to avoid mutation of the original object
  //   this.courseIdToEdit = course.id; // Ensure the id is assigned
  //   this.editMode = true;
  // }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.loadCourses();
      },
      (error) => {
        console.error('Error deleting course', error);
      }
    );
  }

  resetForm(): void {
    this.course = new Course();
    this.selectedImage = null;
    this.editMode = false;
    this.courseIdToEdit = null; // Reset to null after form submission
  }
}