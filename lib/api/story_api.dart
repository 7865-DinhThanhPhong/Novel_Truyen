import 'dart:convert';
import 'package:http/http.dart' as http;
import '/models/story.dart'; // Thay truyen bằng tên package của bạn

class StoryApi {
  static const String baseUrl = "http://10.0.2.2:8082"; // Thay bằng địa chỉ backend của bạn

  Future<List<Story>> getStories() async {
    final response = await http.get(Uri.parse("$baseUrl/stories"));
    if (response.statusCode == 200) {
      List jsonResponse = json.decode(utf8.decode(response.bodyBytes));
      return jsonResponse.map((data) => Story.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load stories');
    }
  }

  Future<Story> getStoryById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/stories/$id'));

    if (response.statusCode == 200) {
      return Story.fromJson(json.decode(utf8.decode(response.bodyBytes)));
    } else {
      throw Exception('Failed to load story');
    }
  }
// ... các hàm gọi API khác nếu cần (ví dụ: tìm kiếm truyện)
}