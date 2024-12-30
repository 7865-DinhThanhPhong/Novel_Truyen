class User {
  String _id;
  String _username;
  String _email;
  List<String> _favoriteStories;
  List<String> _readStories;

  User({
    required String id,
    required String username,
    required String email,
    List<String> favoriteStories = const [],
    List<String> readStories = const [],
  })  : _id = id,
        _username = username,
        _email = email,
        _favoriteStories = favoriteStories,
        _readStories = readStories;

  // Getters
  String get id => _id;
  String get username => _username;
  String get email => _email;
  List<String> get favoriteStories => _favoriteStories;
  List<String> get readStories => _readStories;

  // Setters
  set id(String value) {
    _id = value;
  }

  set username(String value) {
    _username = value;
  }

  set email(String value) {
    _email = value;
  }

  set favoriteStories(List<String> value) {
    _favoriteStories = value;
  }

  set readStories(List<String> value) {
    _readStories = value;
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      favoriteStories: List<String>.from(json['favoriteStories'] ?? []),
      readStories: List<String>.from(json['readStories'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _id,
      'username': _username,
      'email': _email,
      'favoriteStories': _favoriteStories,
      'readStories': _readStories,
    };
  }
}