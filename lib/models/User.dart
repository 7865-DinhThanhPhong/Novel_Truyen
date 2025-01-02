class User {
  int? userId;
  String? username;
  String? password;
  String? email;
  String? avatar;
  String? role;
  List<int>? favoriteStories;

  User(
      {this.userId,
        this.username,
        this.password,
        this.email,
        this.avatar,
        this.role,
        this.favoriteStories});

  User.fromJson(Map<String, dynamic> json) {
    userId = json['userId'];
    username = json['username'];
    password = json['password'];
    email = json['email'];
    avatar = json['avatar'];
    role = json['role'];
    favoriteStories = json['favoriteStories'].cast<int>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['userId'] = userId;
    data['username'] = username;
    data['password'] = password;
    data['email'] = email;
    data['avatar'] = avatar;
    data['role'] = role;
    data['favoriteStories'] = favoriteStories;
    return data;
  }
}