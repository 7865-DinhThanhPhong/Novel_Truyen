import 'User.dart';

class Comment {
  int? id;
  User? user;
  int? storyId; // Không cần class Story, chỉ cần id là đủ
  String? content;
  DateTime? createdAt;
  DateTime? update_at;
  Comment? parent; // Refer to the parent comment (if it's a reply)
  List<Comment>? replies; // List of reply comments

  Comment(
      {this.id,
        this.user,
        this.storyId,
        this.content,
        this.createdAt,
        this.update_at,
        this.parent,
        this.replies});

  Comment.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    user = json['user'] != null ? User.fromJson(json['user']) : null;
    storyId = json['storyId'];
    content = json['content'];
    createdAt = json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : null;
    update_at = json['updateAt'] != null
        ? DateTime.parse(json['updateAt'])
        : null;
    parent = json['parent'] != null ? Comment.fromJson(json['parent']) : null;
    if (json['replies'] != null) {
      replies = <Comment>[];
      json['replies'].forEach((v) {
        replies!.add(Comment.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    if (user != null) {
      data['user'] = user!.toJson();
    }
    data['storyId'] = storyId;
    data['content'] = content;
    data['createdAt'] = createdAt?.toIso8601String();
    data['updateAt'] = update_at?.toIso8601String();
    if (parent != null) {
      data['parent'] = parent!.toJson();
    }
    if (replies != null) {
      data['replies'] = replies!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}