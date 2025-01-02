class Chapter {
  int? id;
  String? title;
  String? content;
  int? chapterNumber;
  DateTime? createAt;
  DateTime? updateAt;
  int? view;
  int? test; // Giá trị này sẽ không được serialize/deserialize

  Chapter(
      {this.id,
        this.title,
        this.content,
        this.chapterNumber,
        this.createAt,
        this.updateAt,
        this.view,
        this.test});

  Chapter.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    content = json['content'];
    chapterNumber = json['chapterNumber'];
    createAt = json['createAt'] != null
        ? DateTime.parse(json['createAt'])
        : null;
    updateAt = json['updateAt'] != null
        ? DateTime.parse(json['updateAt'])
        : null;
    view = json['view'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['title'] = title;
    data['content'] = content;
    data['chapterNumber'] = chapterNumber;
    data['createAt'] = createAt?.toIso8601String();
    data['updateAt'] = updateAt?.toIso8601String();
    data['view'] = view;
    return data;
  }
}