// providers/chapter_provider.dart
import 'package:flutter/material.dart';
import '../api/chapter_api.dart'; // Thay truyen_chu bằng tên package của bạn

class ChapterProvider with ChangeNotifier {
  final ChapterApi _chapterApi = ChapterApi();

  Future<void> setView(int chapterId) async {
    try {
      await _chapterApi.setView(chapterId);

    } catch (e) {
      print("Error setting view: $e");
    }
  }
}