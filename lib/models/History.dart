class History {
  int? id;
  int? userId;
  int? storyId;
  int? chapterId;
  DateTime? createdAt;

  History({this.id, this.userId, this.storyId, this.chapterId, this.createdAt});

  History.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    storyId = json['storyId'];
    chapterId = json['chapterId'];
    createdAt = json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['userId'] = userId;
    data['storyId'] = storyId;
    data['chapterId'] = chapterId;
    data['createdAt'] = createdAt?.toIso8601String();
    return data;
  }
}