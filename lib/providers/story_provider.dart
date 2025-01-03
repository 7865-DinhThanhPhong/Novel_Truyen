import 'package:flutter/material.dart';
import '../api/story_api.dart'; // Thay truyen bằng tên package của bạn
import '/models/story.dart'; // Thay truyen bằng tên package của bạn

class StoryProvider with ChangeNotifier {
  final StoryApi _storyApi = StoryApi();
  List<Story> _stories = [];
  List<Story> get stories => _stories;
  bool isLoading = false;

  Future<void> fetchStories() async {
    isLoading = true;
    notifyListeners();
    try {
      _stories = await _storyApi.getStories();
    } catch (e) {
      print(e);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchStoryDetails(int id) async {
    try {
      final story = await _storyApi.getStoryById(id);
      final index = _stories.indexWhere((s) => s.id == id);
      if (index != -1) {
        _stories[index] = story;
      } else {
        _stories.add(story);
      }
      notifyListeners();
    } catch (e) {
      print('Error fetching story details: $e');
    }
  }
}