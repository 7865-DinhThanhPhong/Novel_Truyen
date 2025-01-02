import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/User.dart'; // Import model User, thay truyen bằng tên package của bạn

class AuthApi {
  static const String baseUrl =
      "http://localhost:8082/api/auth"; // Thay bằng địa chỉ backend của bạn

  Future<bool> register(String email, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/register"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      return true;
    } else {

      print("Registration failed: ${response.body}");
      return false;
    }
  }

  Future<bool> login(String email, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/login"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // Lưu thông tin user vào SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('isLoggedIn', true);

      // Lưu user object dưới dạng JSON string
      Map<String, dynamic> userMap = json.decode(response.body);
      User user = User.fromJson(userMap);
      String userJson = json.encode(user.toJson());
      await prefs.setString('user', userJson);

      return true;
    } else {
      print("Login failed: ${response.body}");
      return false;
    }
  }
}