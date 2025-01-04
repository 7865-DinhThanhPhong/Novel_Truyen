// api/category_api.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/category.dart'; // Thay truyen_chu bằng tên package của bạn

class CategoryApi {
  static const String baseUrl = "http://10.0.2.2:8082"; // Thay bằng địa chỉ backend của bạn

  Future<List<Category>> getCategories() async {
    final response = await http.get(Uri.parse("$baseUrl/categories"));
    if (response.statusCode == 200) {
      List jsonResponse = json.decode(utf8.decode(response.bodyBytes));
      return jsonResponse.map((data) => Category.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load categories');
    }
  }
}