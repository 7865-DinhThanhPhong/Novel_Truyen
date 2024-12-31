package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.Story;
import com.example.noveltruyen.Repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    public List<Story> findAllStories() {
        return storyRepository.findAll();
    }

    public Story findStoryById(Long id) {
       return storyRepository.findById(id).orElse(null);
    }

    public List<Story> findStoriesByCategoryName(String categoryName) {
        return storyRepository.findByCategories_Name(categoryName);
    }

    public List<Story> findStoriesByTitleContainingIgnoreCase(String title) {
        return storyRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Story> findTopStoriesByViews() {
        return storyRepository.findTopStoriesByViews();
    }

    public List<Story> findNewUpdatedStoryByCategory(String categoryName){
        return storyRepository.findNewUpdatedStoryByCategory(categoryName);
    }

    public List<Story> findNewUpdatedStory(){
        return storyRepository.findNewUpdatedStory();
    }

    public List<Story> findNewUpdatedStoryComplete(){
        return storyRepository.findNewUpdatedStoryComplete();
    }

    public List<Story> findNewUpdatedStoryCompleteByCategory(String categoryName){
        return storyRepository.findNewUpdatedStoryCompleteByCategory(categoryName);
    }

    public Story saveStory(Story story) {
        return storyRepository.save(story);
    }

    public void deleteStoryById(Long id) {
        storyRepository.deleteById(id);
    }

    public Story updateStory(Long id, Story updatedStory) {
        return storyRepository.findById(id).map(story -> {
            story.setTitle(updatedStory.getTitle());
            story.setAuthor(updatedStory.getAuthor());
            story.setDescription(updatedStory.getDescription());
            story.setCategories(updatedStory.getCategories());
            story.setCompleted(updatedStory.isCompleted());
            story.setViews(updatedStory.getViews());
            story.setCoverImageUrl(updatedStory.getCoverImageUrl());
            story.setChapters(updatedStory.getChapters());
            story.setUpdatedAt(LocalDateTime.now());
            return storyRepository.save(story);
        }).orElse(null);
    }

    public String uploadImage(MultipartFile imageFile) throws IOException {
        if(imageFile == null || imageFile.isEmpty()){
            return null;
        }
        String uploadsDir = "target/classes/static/images/";
        Path uploadPath = Paths.get(uploadsDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = imageFile.getOriginalFilename();
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String UUIDname = UUID.randomUUID().toString() + fileExtension;

        Path filePath = uploadPath.resolve(UUIDname);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/images/" + UUIDname;
    }

    public void deleteImage(String imageUrl, String baseUrl) throws IOException {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);


            String imagePath1 = "target/classes/static/images/" + imageName;

            Path filePath1 = Paths.get (imagePath1);
            Files.deleteIfExists(filePath1);
        }
    }
}