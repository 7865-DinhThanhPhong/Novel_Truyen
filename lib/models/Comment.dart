import 'User.dart';
import 'Story.dart';

class Comment {
  int? id;
  User? user;
  Story? story;
  String? content;
  DateTime? createdAt;
  DateTime? update_at;
  int? parentId;
   List<Comment>? replies =[];

  Comment({
    this.id,
    this.user,
    this.story,
    this.content ,
    this.createdAt,
    this.update_at,
    this.parentId,

  });



  Comment.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    user = json['user'] != null ? User.fromJson(json['user']) : null;
    story = json['story'] != null ? Story.fromJson(json['story']) : null;
    content = json['content'];
    createdAt = json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null;
    update_at = json['updateAt'] != null ? DateTime.parse(json['updateAt']) : null;
    parentId = json['parentId'];
    // Xóa phần parse replies ở đây
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    if (user != null) {
      data['user'] = user!.toJson();
    }
    if (story != null) {
      data['story'] = story!.toJson();
    }
    data['content'] = content;
    data['createdAt'] = createdAt?.toIso8601String();
    data['updateAt'] = update_at?.toIso8601String();
    data['parentId'] = parentId;
    // Xóa phần replies ở đây
    return data;
  }
}