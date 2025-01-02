import "category.dart";
import 'Chapter.dart';

class Story {
  int? id;
  String? title;
  String? author;
  String? description;
  String? descriptionShow;
  String? coverImageUrl;
  List<Chapter>? chapters;
  List<Category>? categories;
  int? views;
  DateTime? createdAt;
  DateTime? updatedAt;
  bool? isCompleted;

  Story({
    this.id,
    this.title,
    this.author,
    this.description,
    this.descriptionShow,
    this.coverImageUrl,
    this.chapters,
    this.categories,
    this.views,
    this.createdAt,
    this.updatedAt,
    this.isCompleted,
  });

  Story.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    author = json['author'];
    description = json['description'];
    descriptionShow = json['descriptionShow'];
    coverImageUrl = json['coverImageUrl'];
    if (json['chapters'] != null) {
      chapters = <Chapter>[];
      json['chapters'].forEach((v) {
        chapters!.add(Chapter.fromJson(v));
      });
    }
    if (json['categories'] != null) {
      categories = <Category>[];
      json['categories'].forEach((v) {
        categories!.add(Category.fromJson(v));
      });
    }
    views = json['views'];
    createdAt = json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : null;
    updatedAt = json['updatedAt'] != null
        ? DateTime.parse(json['updatedAt'])
        : null;
    isCompleted = json['isCompleted'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['title'] = title;
    data['author'] = author;
    data['description'] = description;
    data['descriptionShow'] = descriptionShow;
    data['coverImageUrl'] = coverImageUrl;
    if (chapters != null) {
      data['chapters'] = chapters!.map((v) => v.toJson()).toList();
    }
    if (categories != null) {
      data['categories'] = categories!.map((v) => v.toJson()).toList();
    }
    data['views'] = views;
    data['createdAt'] = createdAt?.toIso8601String();
    data['updatedAt'] = updatedAt?.toIso8601String();
    data['isCompleted'] = isCompleted;
    return data;
  }
}