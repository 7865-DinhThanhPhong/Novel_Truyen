package com.example.noveltruyen.Repository;

import com.example.noveltruyen.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByStoryIdAndParentIsNull(Long storyId); // Lấy comment gốc theo storyId
    List<Comment> findByParentId(Long parentId); // Lấy replies theo parentId
}
