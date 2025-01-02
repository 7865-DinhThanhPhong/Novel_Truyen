package com.example.noveltruyen.Controller;

import com.example.noveltruyen.Model.Chapter;
import com.example.noveltruyen.Model.Story;
import com.example.noveltruyen.Service.ChapterService;
import com.example.noveltruyen.Service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chapters")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;
    @Autowired
    private StoryService storyService;

    @GetMapping("/{id}")
    public ResponseEntity<Chapter> getChapterById(@PathVariable Long id) {
        Optional<Chapter> chapter = chapterService.getById(id);
        return chapter.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/story/{id}")
    public ResponseEntity<List<Chapter>> getChaptersByStory (@PathVariable Long id){
        List<Chapter> chapters = chapterService.getByChaptersStoryId(id);
        return ResponseEntity.ok(chapters);
    }

    @GetMapping
    public ResponseEntity<List<Chapter>> getAllChapters() {
        List<Chapter> chapters = chapterService.getAll();
        return new ResponseEntity<>(chapters, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> updateChapter(@PathVariable Long id, @RequestBody Chapter chapter) {

        Chapter chapterExist = chapterService.getById(id).orElse(null);
        if (chapterExist != null){
            chapterExist.setTitle(chapter.getTitle());
            chapterExist.setContent(chapter.getContent());
            chapterExist.setChapterNumber(chapter.getChapterNumber());
            chapterExist.setUpdateAt(LocalDateTime.now());
            Chapter updatedChapter = chapterService.Update(chapterExist);
            if (updatedChapter != null)
                return  ResponseEntity.ok(updatedChapter.getStory()); // Tra ve story
        }
            return  ResponseEntity.badRequest().build();

    }

    @PostMapping("/{id}")
    public ResponseEntity<Chapter> addChapter(@RequestBody Chapter chapter, @PathVariable Long id) {
        Story story = storyService.findStoryById(id);
        chapter.setStory(story);
        Chapter savedChapter = chapterService.Add(chapter);

        storyService.addChapterToChapters(savedChapter.getStory().getId(), savedChapter);
        return new ResponseEntity<>(savedChapter, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChapterById(@PathVariable Long id) {
        Chapter chapter = chapterService.getById(id).orElse(null);
        if(chapter!= null){
            storyService.deleteChapterFromChapters(chapter.getStory().getId(), chapter);
            chapterService.DeleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/view")
    public ResponseEntity<Void> setView(@PathVariable Long id){
        chapterService.setView(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}