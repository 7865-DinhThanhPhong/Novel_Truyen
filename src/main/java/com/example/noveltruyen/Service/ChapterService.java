package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.Chapter;
import com.example.noveltruyen.Repository.ChapterRepository;
import com.example.noveltruyen.Repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChapterService {
    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private StoryRepository storyRepository;

    public Optional<Chapter> getById (Long id){
        return chapterRepository.findById(id);
    }

    public List<Chapter> getAll (){
        return chapterRepository.findAll();
    }

    public Chapter Update (Chapter chapter){

        return chapterRepository.save(chapter);
    }

    public Chapter Add (Chapter chapter){
        return chapterRepository.save(chapter);
    }

    public void DeleteById (Long id){
        Chapter chapter = chapterRepository.findById(id).orElse(null);

        if (chapter != null) {
            chapter.getStory().setViews(chapter.getStory().getViews() - chapter.getView());
            storyRepository.save(chapter.getStory());
            chapterRepository.save(chapter);
        }

    }

    public void setView (Long id){
        Chapter chapter = chapterRepository.findById(id).orElse(null);
        if(chapter != null){
            chapter.setView(chapter.getView() + 1);
            chapter.getStory().setViews(chapter.getStory().getViews() + 1);
            chapterRepository.save(chapter);
            storyRepository.save(chapter.getStory());
        }

    }
}
