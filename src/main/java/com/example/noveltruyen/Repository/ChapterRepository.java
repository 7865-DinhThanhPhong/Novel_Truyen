package com.example.noveltruyen.Repository;

import com.example.noveltruyen.Model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByStoryIdOrderByChapterNumberAsc(Long storyId);
}