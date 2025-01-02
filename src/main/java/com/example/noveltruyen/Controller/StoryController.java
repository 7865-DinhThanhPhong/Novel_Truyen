package com.example.noveltruyen.Controller;

import com.example.noveltruyen.Model.Category;
import com.example.noveltruyen.Model.Story;
import com.example.noveltruyen.Service.CategoryService;
import com.example.noveltruyen.Service.StoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;
    @Autowired
    private CategoryService categoryService;
    private final String baseUrl = "http://localhost:8081";

    @GetMapping
    public ResponseEntity<List<Story>> getAllStories() {
        List<Story> stories = storyService.findAllStories();
        return ResponseEntity.ok(stories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        Story story = storyService.findStoryById(id);
        if (story != null) {
            return new ResponseEntity<>(story, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Story>> getStoriesByCategoryName(@PathVariable String categoryName) {
        List<Story> stories = storyService.findStoriesByCategoryName(categoryName);
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Story>> searchStoriesByTitle(@RequestParam String title) {
        List<Story> stories = storyService.findStoriesByTitleContainingIgnoreCase(title);
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/top-views")
    public ResponseEntity<List<Story>> getTopStoriesByViews() {
        List<Story> stories = storyService.findTopStoriesByViews();
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/new-updated")
    public ResponseEntity<List<Story>> getNewUpdatedStories() {
        List<Story> stories = storyService.findNewUpdatedStory();
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/new-updated/category/{categoryName}")
    public ResponseEntity<List<Story>> getNewUpdatedStoriesByCategory(@PathVariable String categoryName) {
        List<Story> stories = storyService.findNewUpdatedStoryByCategory(categoryName);
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/new-updated/complete")
    public ResponseEntity<List<Story>> getNewUpdatedStoriesComplete() {
        List<Story> stories = storyService.findNewUpdatedStoryComplete();
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/new-updated/complete/category/{categoryName}")
    public ResponseEntity<List<Story>> getNewUpdatedStoriesCompleteByCategory(@PathVariable String categoryName) {
        List<Story> stories = storyService.findNewUpdatedStoryCompleteByCategory(categoryName);
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Story> addStory(
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImageFile,
            @RequestPart("storyData") String storyDataJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Story story = objectMapper.readValue(storyDataJson, Story.class);

            if (coverImageFile != null && !coverImageFile.isEmpty()) {
                String imageUrl = storyService.uploadImage(coverImageFile);
                story.setCoverImageUrl(baseUrl + imageUrl);
            }

            Story savedStory = storyService.saveStory(story);
            return new ResponseEntity<>(savedStory, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStoryById(@PathVariable Long id) {
        storyService.deleteStoryById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Story> updateStory(
            @PathVariable Long id,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImageFile,
            @RequestPart("storyData") String storyDataJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Story updatedStory = objectMapper.readValue(storyDataJson, Story.class);
            Story existingStory = storyService.findStoryById(id);
            if (existingStory == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            // Xử lý categories
            List<Category> categories = new ArrayList<>();
            for (Category category : updatedStory.getCategories()) {
                Category existingCategory = categoryService.getById(category.getId()).orElse(null);
                if (existingCategory == null) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                categories.add(existingCategory);
            }
            existingStory.setCategories(categories);
            if(updatedStory.getChapters() != null)
                existingStory.setChapters(updatedStory.getChapters());

            if (coverImageFile != null && !coverImageFile.isEmpty()) {
                // Delete old image if exists
                storyService.deleteImage(existingStory.getCoverImageUrl(), baseUrl);

                String imageUrl = storyService.uploadImage(coverImageFile);
                existingStory.setCoverImageUrl(baseUrl + imageUrl);
            }else {
                existingStory.setCoverImageUrl(updatedStory.getCoverImageUrl());
            }

            existingStory.setTitle(updatedStory.getTitle());
            existingStory.setAuthor(updatedStory.getAuthor());
            existingStory.setDescription(updatedStory.getDescription());
            existingStory.setDescriptionShow(updatedStory.getDescriptionShow());


            Story savedStory = storyService.saveStory(existingStory);
            return new ResponseEntity<>(savedStory, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}