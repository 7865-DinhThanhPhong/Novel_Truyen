class Bookmark {
  String _id;
  String _userId;
  String _storyId;
  String _chapterId;
  int _pageNumber;
  DateTime _createdAt;

  Bookmark({
    required String id,
    required String userId,
    required String storyId,
    required String chapterId,
    required int pageNumber,
    required DateTime createdAt,
  })  : _id = id,
        _userId = userId,
        _storyId = storyId,
        _chapterId = chapterId,
        _pageNumber = pageNumber,
        _createdAt = createdAt;

  // Getters
  String get id => _id;
  String get userId => _userId;
  String get storyId => _storyId;
  String get chapterId => _chapterId;
  int get pageNumber => _pageNumber;
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

  set chapterId(String value) {
    _chapterId = value;
  }

  set pageNumber(int value) {
    _pageNumber = value;
  }

  set createdAt(DateTime value) {
    _createdAt = value;
  }

  factory Bookmark.fromJson(Map<String, dynamic> json) {
    return Bookmark(
      id: json['id'],
      userId: json['userId'],
      storyId: json['storyId'],
      chapterId: json['chapterId'],
      pageNumber: json['pageNumber'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'userId': _userId,
      'storyId': _storyId,
      'chapterId': _chapterId,
      'pageNumber': _pageNumber,
      'createdAt': _createdAt.toIso8601String(),
    };
  }
}