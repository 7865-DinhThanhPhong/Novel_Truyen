import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class RatingApi {
  static const String baseUrl = "http://10.0.2.2:8082/ratings";

  Future<double?> getUserRatingForStory(int storyId) async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson == null) {
      return null; // User not logged in
    }
    final userMap = json.decode(userJson);
    final userId = userMap['userId'];

    final response = await http.get(Uri.parse('$baseUrl/story/$storyId/user/$userId'));

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['value'].toDouble(); // Assuming the API returns the rating value
    } else if (response.statusCode == 404) {
      return null; // No rating found for this user and story
    } else {
      throw Exception('Failed to load rating');
    }
  }

  Future<void> postRating(int storyId, double value) async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson == null) {
      throw Exception('User not logged in');
    }
    final userMap = json.decode(userJson);
    final userId = userMap['userId'];

    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'userId': userId,
        'storyId': storyId,
        'value': value,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to post rating');
    }
  }
}