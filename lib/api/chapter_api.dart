// api/chapter_api.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ChapterApi {
  static const String baseUrl = "http://10.0.2.2:8082/chapters"; // Thay bằng địa chỉ backend của bạn

  Future<void> setView(int chapterId) async {
    final response = await http.put(
      Uri.parse("$baseUrl/$chapterId/view"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to set view for chapter');
    }
  }
}