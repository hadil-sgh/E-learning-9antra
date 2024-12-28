package tn.beecoders.backend.services;

import org.springframework.web.multipart.MultipartFile;
import tn.beecoders.backend.entities.Course;

import java.io.IOException;
import java.util.List;

public interface ICourseServices {
    Course addCourses(Course course, MultipartFile image) throws IOException;
    Course updateCourses(Course course);
    Course getOneCourses(Long id );
    List<Course> allCourses();
    void deleteCourses(Long id);
}
