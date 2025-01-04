import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/comment.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CommentApi {
  static const String baseUrl = "http://10.0.2.2:8082/comments"; // Thay bằng địa chỉ API của bạn

  Future<List<Comment>> getCommentsForStory(int storyId) async {
    final response = await http.get(Uri.parse("$baseUrl/story/$storyId"));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((item) => Comment.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load comments');
    }
  }

  Future<Comment> postComment(int storyId, String content, {int? parentId}) async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson == null) {
      throw Exception('User not logged in');
    }
    final userMap = json.decode(userJson);
    final userId = userMap['userId'];

    final Map<String, dynamic> body = {
      'userId': userId,
      'storyId': storyId,
      'content': content,
      'parentId': parentId,
    };
    body.removeWhere((key, value) => value == null);

    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 201) {
      return Comment.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to post comment');
    }
  }

  Future<void> deleteComment(int commentId) async {
    final response = await http.delete(Uri.parse('$baseUrl/$commentId'));

    if (response.statusCode != 204) {
      throw Exception('Failed to delete comment. Status code: ${response.statusCode}');
    }
  }

  Future<Comment> updateComment(int commentId, String newContent) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$commentId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'content': newContent,
      }),
    );

    if (response.statusCode == 200) {
      return Comment.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to update comment. Status code: ${response.statusCode}');
    }
  }
}