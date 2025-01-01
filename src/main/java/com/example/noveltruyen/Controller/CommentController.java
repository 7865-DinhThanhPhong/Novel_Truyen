package com.example.noveltruyen.Controller;
import com.example.noveltruyen.Model.Comment;
import com.example.noveltruyen.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentService.findCommentById(id);
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/story/{storyId}")
    public ResponseEntity<List<Comment>> getCommentsByStoryId(@PathVariable Long storyId) {
        List<Comment> comments = commentService.findCommentsByStoryIdAndParentIsNull(storyId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<Comment>> getCommentsByParentId(@PathVariable Long parentId) {
        List<Comment> comments = commentService.findCommentsByParentId(parentId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.saveComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PostMapping("/{parentId}/reply")
    public ResponseEntity<Comment> addReplyToComment(@PathVariable Long parentId, @RequestBody Comment reply) {
        Comment savedReply = commentService.addReplyToComment(parentId, reply);
        return new ResponseEntity<>(savedReply, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable Long id) {
        commentService.deleteCommentById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}