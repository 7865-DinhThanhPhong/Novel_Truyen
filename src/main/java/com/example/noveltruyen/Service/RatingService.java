package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.Rating;
import com.example.noveltruyen.Repository.RatingRepository;
import com.example.noveltruyen.Repository.StoryRepository;
import com.example.noveltruyen.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoryRepository storyRepository;

    public Rating findRatingByUserIdAndStoryId(Long userId, Long storyId) {
        return ratingRepository.findByUserIdAndStoryId(userId, storyId);
    }

    public List<Rating> findRatingsByStoryId(Long storyId) {
        return ratingRepository.findByStoryId(storyId);
    }

    @Transactional
    public Rating saveRating(Rating rating) {
        Rating existingRating = findRatingByUserIdAndStoryId(rating.getUserId(), rating.getStoryId());
        if (existingRating != null) {
            existingRating.setValue(rating.getValue());
            return ratingRepository.save(existingRating);
        } else {
            return ratingRepository.save(rating);
        }
    }

    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }
}