class Rating {
  String _id;
  String _userId;
  String _storyId;
  double _value;
  DateTime _createdAt;

  Rating({
    required String id,
    required String userId,
    required String storyId,
    required double value,
    required DateTime createdAt,
  })  : _id = id,
        _userId = userId,
        _storyId = storyId,
        _value = value,
        _createdAt = createdAt;

  // Getters
  String get id => _id;
  String get userId => _userId;
  String get storyId => _storyId;
  double get value => _value;
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

  set value(double value) {
    if (value >= 0.0 && value <= 5.0) {
      _value = value;
    } else {
      print('Invalid rating value');
    }
  }

  set createdAt(DateTime value) {
    _createdAt = value;
  }

  factory Rating.fromJson(Map<String, dynamic> json) {
    return Rating(
      id: json['id'],
      userId: json['userId'],
      storyId: json['storyId'],
      value: json['value']?.toDouble() ?? 0.0,
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'userId': _userId,
      'storyId': _storyId,
      'value': _value,
      'createdAt': _createdAt.toIso8601String(),
    };
  }
}