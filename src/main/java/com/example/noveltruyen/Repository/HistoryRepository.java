package com.example.noveltruyen.Repository;

import com.example.noveltruyen.Model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserIdOrderByCreatedAtDesc(Long userId);
    History findByUserIdAndStoryId(Long userId, Long storyId); // Tìm 1 dữ liệu lịch sử theo userId và storyId
}