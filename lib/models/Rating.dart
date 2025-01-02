class Rating {
  int? id;
  int? userId;
  int? storyId;
  double? value;
  DateTime? createdAt;

  Rating({this.id, this.userId, this.storyId, this.value, this.createdAt});

  Rating.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    storyId = json['storyId'];
    value = json['value'];
    createdAt = json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['userId'] = userId;
    data['storyId'] = storyId;
    data['value'] = value;
    data['createdAt'] = createdAt?.toIso8601String();
    return data;
  }
}