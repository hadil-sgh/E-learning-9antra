package tn.beecoders.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.beecoders.backend.entities.Course;

public interface ICourseRepository extends JpaRepository<Course,Long> {


}
