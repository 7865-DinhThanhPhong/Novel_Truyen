package com.example.noveltruyen.Repository;

import com.example.noveltruyen.Model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByCategories_Name(String categoryName);
    List<Story> findByTitleContainingIgnoreCase(String title); // Tìm kiếm truyện theo title

    // Ví dụ custom query để lấy top truyện theo views
    @Query("SELECT s FROM Story s ORDER BY s.views DESC")
    List<Story> findTopStoriesByViews();

    @Query("SELECT s FROM Story s JOIN s.categories c WHERE c.name = :categoryName ORDER BY s.updatedAt DESC")
    List<Story> findNewUpdatedStoryByCategory(String categoryName);

    @Query("SELECT s from Story s ORDER BY s.updatedAt DESC")
    List<Story> findNewUpdatedStory();

    @Query("SELECT s from Story s where s.isCompleted = true ORDER BY s.updatedAt DESC")
    List<Story> findNewUpdatedStoryComplete();

    @Query("SELECT s FROM Story s JOIN s.categories c WHERE c.name = :categoryName AND s.isCompleted = true ORDER BY s.updatedAt DESC")
    List<Story> findNewUpdatedStoryCompleteByCategory(String categoryName);

}