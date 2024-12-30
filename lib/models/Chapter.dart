class Chapter {
  String _id;
  String _title;
  String _content;
  int _chapterNumber;
  DateTime _publishedAt;

  Chapter({
    required String id,
    required String title,
    required String content,
    required int chapterNumber,
    required DateTime publishedAt,
  })  : _id = id,
        _title = title,
        _content = content,
        _chapterNumber = chapterNumber,
        _publishedAt = publishedAt;

  // Getters
  String get id => _id;
  String get title => _title;
  String get content => _content;
  int get chapterNumber => _chapterNumber;
  DateTime get publishedAt => _publishedAt;

  // Setters
  set id(String value) {
    _id = value;
  }

  set title(String value) {
    _title = value;
  }

  set content(String value) {
    _content = value;
  }

  set chapterNumber(int value) {
    _chapterNumber = value;
  }

  set publishedAt(DateTime value) {
    _publishedAt = value;
  }

  factory Chapter.fromJson(Map<String, dynamic> json) {
    return Chapter(
      id: json['id'],
      title: json['title'],
      content: json['content'],
      chapterNumber: json['chapterNumber'],
      publishedAt: DateTime.parse(json['publishedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'title': _title,
      'content': _content,
      'chapterNumber': _chapterNumber,
      'publishedAt': _publishedAt.toIso8601String(),
    };
  }
}