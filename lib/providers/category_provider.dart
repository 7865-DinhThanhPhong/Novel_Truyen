// providers/category_provider.dart
import 'package:flutter/material.dart';
import '../api/category_api.dart'; // Thay truyen_chu bằng tên package của bạn
import '../models/category.dart'; // Thay truyen_chu bằng tên package của bạn

class CategoryProvider with ChangeNotifier {
  final CategoryApi _categoryApi = CategoryApi();
  List<Category> _categories = [];
  List<Category> get categories => _categories;
  bool isLoading = false;

  Future<void> fetchCategories() async {
    isLoading = true;
    notifyListeners();
    try {
      _categories = await _categoryApi.getCategories();
    } catch (e) {
      print(e);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}