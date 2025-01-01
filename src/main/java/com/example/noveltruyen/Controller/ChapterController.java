package com.example.noveltruyen.Controller;

import com.example.noveltruyen.Model.Chapter;
import com.example.noveltruyen.Service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chapters")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @GetMapping("/{id}")
    public ResponseEntity<Chapter> getChapterById(@PathVariable Long id) {
        Optional<Chapter> chapter = chapterService.getById(id);
        return chapter.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<Chapter>> getAllChapters() {
        List<Chapter> chapters = chapterService.getAll();
        return new ResponseEntity<>(chapters, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chapter> updateChapter(@PathVariable Long id, @RequestBody Chapter chapter) {

        Chapter chapterExist = chapterService.getById(id).orElse(null);
        if (chapterExist != null){

            chapterExist.setTitle(chapter.getTitle());
            chapterExist.setStory(chapter.getStory());
            chapterExist.setView(chapter.getView());
            chapterExist.setCreateAt(chapterExist.getCreateAt());
            chapterExist.setContent(chapterExist.getContent());
            chapterExist.setChapterNumber(chapter.getChapterNumber());
            Chapter updatedChapter = chapterService.Update(chapterExist);
            if (chapterService != null)
                return new ResponseEntity<>(updatedChapter, HttpStatus.OK);
        }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping
    public ResponseEntity<Chapter> addChapter(@RequestBody Chapter chapter) {
        Chapter savedChapter = chapterService.Add(chapter);
        return new ResponseEntity<>(savedChapter, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChapterById(@PathVariable Long id) {
        chapterService.DeleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/{id}/view")
    public ResponseEntity<Void> setView(@PathVariable Long id){
        chapterService.setView(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}