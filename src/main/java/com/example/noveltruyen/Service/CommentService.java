package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.Comment;
import com.example.noveltruyen.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment findCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public List<Comment> findCommentsByStoryIdAndParentIsNull(Long storyId) {
        return commentRepository.findByStoryIdAndParentIsNull(storyId);
    }

    public List<Comment> findCommentsByParentId(Long parentId) {
        return commentRepository.findByParentId(parentId);
    }

    @Transactional
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Transactional
    public Comment addReplyToComment(Long parentId, Comment reply) {
        Comment parent = commentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));
        reply.setParent(parent);
        return commentRepository.save(reply);
    }

    @Transactional
    public void deleteCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        List<Comment> replies = comment.getReplies();
        if (replies != null && !replies.isEmpty()) {
            commentRepository.deleteAll(replies);
        }

        commentRepository.delete(comment);
    }
}