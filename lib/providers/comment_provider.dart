import 'package:flutter/material.dart';
import '../api/comment_api.dart';
import '../models/comment.dart';
import 'package:collection/collection.dart';

class CommentProvider with ChangeNotifier {
  final CommentApi _commentApi = CommentApi();
  List<Comment> _comments = []; // Chỉ lưu trữ bình luận gốc

  List<Comment> get comments => _comments;

  Future<void> fetchCommentsForStory(int storyId) async {
    try {
      final allComments = await _commentApi.getCommentsForStory(storyId);
      // Lọc ra bình luận gốc (có parentId == null)
      _comments = allComments.where((c) => c.parentId == null).toList();
      // Gán replies cho từng comment (nếu có)
      for (final comment in _comments) {
        comment.replies = allComments.where((c) => c.parentId == comment.id).toList();
      }
      notifyListeners();
    } catch (e) {
      print('Error fetching comments: $e');
    }
  }

  Future<void> postComment(int storyId, String content, {int? parentId}) async {
    try {
      final newComment = await _commentApi.postComment(storyId, content, parentId: parentId);
      if (newComment != null && newComment.id != null) {
        if (parentId == null) {
          // Nếu là bình luận gốc, thêm vào đầu danh sách _comments
          _comments.insert(0, newComment); // Thêm vào đầu danh sách
        } else {
          // Nếu là phản hồi, tìm comment cha và thêm vào replies
          // Cần tìm comment cha trong _comments và cả trong replies của các comment khác
          Comment? parentComment = _findCommentById(_comments, parentId);
          if (parentComment != null) {
            parentComment.replies ??= [];
            parentComment.replies!.add(newComment);
          }
        }
        notifyListeners();
      } else {
        print('Error: newComment is null or has invalid ID');
      }
    } catch (e) {
      print('Error posting comment: $e');
      // Handle error appropriately
    }
  }

// Hàm tìm comment theo ID (đệ quy)
  Comment? _findCommentById(List<Comment> comments, int id) {
    for (final comment in comments) {
      if (comment.id == id) {
        return comment;
      }
      if (comment.replies != null) {
        final foundInReplies = _findCommentById(comment.replies!, id);
        if (foundInReplies != null) {
          return foundInReplies;
        }
      }
    }
    return null;
  }

  Future<void> deleteComment(int commentId) async {
    try {
      await _commentApi.deleteComment(commentId);
      // Xóa comment khỏi danh sách _comments hoặc replies
      _comments.removeWhere((c) => c.id == commentId);
      for (final comment in _comments) {
        comment.replies?.removeWhere((c) => c.id == commentId);
      }
      notifyListeners();
    } catch (e) {
      print('Error deleting comment: $e');
      // Handle error appropriately
    }
  }

  Future<void> updateComment(int commentId, String newContent) async {
    try {
      final updatedComment = await _commentApi.updateComment(commentId, newContent);
      // Cập nhật comment trong danh sách _comments hoặc replies
      final commentIndex = _comments.indexWhere((c) => c.id == commentId);
      if (commentIndex != -1) {
        _comments[commentIndex] = updatedComment;
      } else {
        for (final comment in _comments) {
          final replyIndex = comment.replies?.indexWhere((c) => c.id == commentId) ?? -1;
          if (replyIndex != -1) {
            comment.replies?[replyIndex] = updatedComment;
            break;
          }
        }
      }
      notifyListeners();
    } catch (e) {
      print('Error updating comment: $e');
      // Handle error appropriately
    }
  }
}