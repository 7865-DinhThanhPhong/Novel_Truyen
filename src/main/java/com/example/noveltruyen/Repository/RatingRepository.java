package com.example.noveltruyen.Repository;

import com.example.noveltruyen.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUserIdAndStoryId(Long userId, Long storyId); // Lấy rating của user cho story
    List<Rating> findByStoryId(Long storyId); // Lấy tất cả rating của 1 story
}