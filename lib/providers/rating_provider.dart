import 'package:flutter/material.dart';
import '../api/rating_api.dart';

class RatingProvider with ChangeNotifier {
  final RatingApi _ratingApi = RatingApi();

  double? _userRating; // User's rating for the current story
  double? get userRating => _userRating;

  Future<void> fetchUserRating(int storyId) async {
    try {
      _userRating = await _ratingApi.getUserRatingForStory(storyId);
      notifyListeners();
    } catch (e) {
      print('Error fetching user rating: $e');
    }
  }

  Future<void> rateStory(int storyId, double value) async {
    try {
      await _ratingApi.postRating(storyId, value);
      _userRating = value; // Update the local user rating after posting
      notifyListeners();
    } catch (e) {
      print('Error posting rating: $e');
    }
  }
}