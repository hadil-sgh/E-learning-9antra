package tn.beecoders.backend.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.beecoders.backend.entities.Course;
import tn.beecoders.backend.repositories.ICourseRepository;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor

public class CourseServicesImpl implements ICourseServices {

    final ICourseRepository courseRepository;


    @Override
    public Course addCourses(Course course, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            course.setImage(image.getBytes());
        } else {
            throw new IllegalArgumentException("Image file cannot be null or empty");
        }
        return courseRepository.save(course);
    }


    @Override
    public Course updateCourses(Course course) {

        return courseRepository.save(course);
    }

    @Override
    public Course getOneCourses(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Course> allCourses() {

        return courseRepository.findAll();
    }

    @Override
    public void deleteCourses(Long id) {
        courseRepository.deleteById(id);

    }
}
