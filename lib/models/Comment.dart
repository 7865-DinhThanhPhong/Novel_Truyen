class Comment {
  String _id;
  String _userId;
  String _storyId;
  String _content;
  DateTime _createdAt;

  Comment({
    required String id,
    required String userId,
    required String storyId,
    required String content,
    required DateTime createdAt,
  })  : _id = id,
        _userId = userId,
        _storyId = storyId,
        _content = content,
        _createdAt = createdAt;

  // Getters
  String get id => _id;
  String get userId => _userId;
  String get storyId => _storyId;
  String get content => _content;
  DateTime get createdAt => _createdAt;

  // Setters
  set id(String value) {
    _id = value;
  }

  set userId(String value) {
    _userId = value;
  }

  set storyId(String value) {
    _storyId = value;
  }

  set content(String value) {
    _content = value;
  }

  set createdAt(DateTime value) {
    _createdAt = value;
  }

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'],
      userId: json['userId'],
      storyId: json['storyId'],
      content: json['content'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'userId': _userId,
      'storyId': _storyId,
      'content': _content,
      'createdAt': _createdAt.toIso8601String(),
    };
  }
}