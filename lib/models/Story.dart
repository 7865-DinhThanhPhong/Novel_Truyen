import 'chapter.dart';

class Story {
  int? _id;
  String _title;
  String _author;
  String _description;
  String _coverImageUrl;
  List<Chapter> _chapters;
  List<String> _genres;
  int _views;
  DateTime _createdAt;
  DateTime _updatedAt;
  bool _isCompleted;

  Story({
    int? id,
    required String title,
    required String author,
    required String description,
    required String coverImageUrl,
    required List<Chapter> chapters,
    required List<String> genres,
    int views = 0,
    required DateTime createdAt,
    required DateTime updatedAt,
    bool isCompleted = false,
  })  : _id = id,
        _title = title,
        _author = author,
        _description = description,
        _coverImageUrl = coverImageUrl,
        _chapters = chapters,
        _genres = genres,
        _views = views,
        _createdAt = createdAt,
        _updatedAt = updatedAt,
        _isCompleted = isCompleted;

  // Getters
  int? get id => _id;
  String get title => _title;
  String get author => _author;
  String get description => _description;
  String get coverImageUrl => _coverImageUrl;
  List<Chapter> get chapters => _chapters;
  List<String> get genres => _genres;
  int get views => _views;
  DateTime get createdAt => _createdAt;
  DateTime get updatedAt => _updatedAt;
  bool get isCompleted => _isCompleted;

  // Setters
  set id(int? value) {
    _id = value;
  }

  set title(String value) {
    _title = value;
  }

  set author(String value) {
    _author = value;
  }

  set description(String value) {
    _description = value;
  }

  set coverImageUrl(String value) {
    _coverImageUrl = value;
  }

  set chapters(List<Chapter> value) {
    _chapters = value;
  }

  set genres(List<String> value) {
    _genres = value;
  }

  set views(int value) {
    if (value >= 0) {
      _views = value;
    } else {
      print('Invalid views value');
    }
  }

  set createdAt(DateTime value) {
    _createdAt = value;
  }

  set updatedAt(DateTime value) {
    _updatedAt = value;
  }

  set isCompleted(bool value) {
    _isCompleted = value;
  }

  factory Story.fromJson(Map<String, dynamic> json) {
    return Story(
      id: json['id'],
      title: json['title'],
      author: json['author'],
      description: json['description'],
      coverImageUrl: json['coverImageUrl'],
      chapters: (json['chapters'] as List)
          .map((chapter) => Chapter.fromJson(chapter))
          .toList(),
      genres: List<String>.from(json['genres']),
      views: json['views'] ?? 0,
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      isCompleted: json['isCompleted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      // 'id': _id, // Removed id for auto-increment
      'title': _title,
      'author': _author,
      'description': _description,
      'coverImageUrl': _coverImageUrl,
      'chapters': _chapters.map((chapter) => chapter.toJson()).toList(),
      'genres': _genres,
      'views': _views,
      'createdAt': _createdAt.toIso8601String(),
      'updatedAt': _updatedAt.toIso8601String(),
      'isCompleted': _isCompleted,
    };
  }
}