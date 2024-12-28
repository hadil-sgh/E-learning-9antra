package tn.beecoders.backend.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.beecoders.backend.entities.Course;
import tn.beecoders.backend.services.ICourseServices;

import java.util.List;

@RestController
@RequestMapping("/Courses")
@AllArgsConstructor
@CrossOrigin("*")
public class CourseRestController {

    private final ICourseServices courseServices;

    @PostMapping("/add")
    public ResponseEntity<?> addCourse(
            @RequestPart(name = "course") String courseJson,
            @RequestPart(name = "image") MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Course course = objectMapper.readValue(courseJson, Course.class);
            Course createdCourse = courseServices.addCourses(course, image);
            return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{course_id}")
    public ResponseEntity<?> updateCourse(
            @PathVariable("course_id") Long id,
            @RequestPart(value = "course", required = false) String courseJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            Course courseFromId = courseServices.getOneCourses(id);
            Course updatedCourse = new ObjectMapper().readValue(courseJson, Course.class);

            courseFromId.setDescription(updatedCourse.getDescription());
            courseFromId.setTitle(updatedCourse.getTitle());
            courseFromId.setPrice(updatedCourse.getPrice());

            if (image != null && !image.isEmpty()) {
                courseFromId.setImage(image.getBytes());
            }

            Course updated = courseServices.updateCourses(courseFromId);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> fetchAllCourses() {
        try {
            List<Course> courses = courseServices.allCourses();
            return new ResponseEntity<>(courses, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{course_id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable("course_id") Long id) {
        courseServices.deleteCourses(id);
        return ResponseEntity.noContent().build();  // 204 No Content status
    }
}
