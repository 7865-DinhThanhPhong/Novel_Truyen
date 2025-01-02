import 'package:flutter/material.dart';
import '../api/auth_api.dart'; // Thay truyen bằng tên package của bạn
import 'package:shared_preferences/shared_preferences.dart';
import '../models/User.dart'; // Import model User, thay truyen bằng tên package của bạn
import 'dart:convert';

class AuthProvider with ChangeNotifier {
  final AuthApi _authApi = AuthApi();
  bool _isLoggedIn = false;
  User? _user;

  bool get isLoggedIn => _isLoggedIn;
  User? get user => _user;

  AuthProvider() {
    _loadLoggedInState();
  }

  Future<void> _loadLoggedInState() async {
    final prefs = await SharedPreferences.getInstance();
    _isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

    // Lấy user object từ SharedPreferences
    String? userJson = prefs.getString('user');
    if (userJson != null) {
      Map<String, dynamic> userMap = json.decode(userJson);
      _user = User.fromJson(userMap);
    }

    notifyListeners();
  }

  Future<bool> register(String email, String password) async {
    bool success = await _authApi.register(email, password);
    notifyListeners();
    return success;
  }

  Future<bool> login(String email, String password) async {
    bool success = await _authApi.login(email, password);
    if (success) {
      _isLoggedIn = true;
      await _loadLoggedInState(); // Tải lại thông tin user sau khi đăng nhập
    }
    notifyListeners();
    return success;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isLoggedIn', false);
    await prefs.remove('user'); // Xóa thông tin user
    _isLoggedIn = false;
    _user = null;
    notifyListeners();
  }
}