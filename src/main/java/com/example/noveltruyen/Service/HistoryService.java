package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.History;
import com.example.noveltruyen.Model.Story;
import com.example.noveltruyen.Model.User;
import com.example.noveltruyen.Repository.HistoryRepository;
import com.example.noveltruyen.Repository.StoryRepository;
import com.example.noveltruyen.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoryRepository storyRepository;

    public List<History> findHistoriesByUserIdOrderByCreatedAtDesc(Long userId) {
        return historyRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public History findHistoryByUserIdAndStoryId(Long userId, Long storyId) {
        return historyRepository.findByUserIdAndStoryId(userId, storyId);
    }

    public History saveHistory(History history) {
        return historyRepository.save(history);
    }

    public void deleteHistoryById(Long id) {
        historyRepository.deleteById(id);
    }

    public History updateHistory(Long userId, Long storyId, Long chapterId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        History history = historyRepository.findByUserIdAndStoryId(user.getId(), story.getId());

        if (history == null) {
            history = new History();
            history.setUserId(String.valueOf(user.getId()));
            history.setStoryId(String.valueOf(story.getId()));
        }

        history.setChapterId(String.valueOf(chapterId));
        history.setCreatedAt(LocalDateTime.now());

        return historyRepository.save(history);
    }
}