// main.dart
import 'package:flutter/material.dart';
import 'package:novel_truyen/providers/rating_provider.dart';
import 'package:provider/provider.dart';
import './providers/auth_provider.dart'; // Thay truyen_chu bằng tên package của bạn
import './providers/story_provider.dart'; // Thay truyen_chu bằng tên package của bạn
import './routes.dart'; // Thay truyen_chu bằng tên package của bạn
import './screens/welcome_screen.dart'; // Thay truyen_chu bằng tên package của bạn
import './providers/category_provider.dart';
import './providers/chapter_provider.dart';
import './providers/comment_provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthProvider()),
        ChangeNotifierProvider(create: (context) => StoryProvider()),
        ChangeNotifierProvider(create: (context) => CategoryProvider()),
        ChangeNotifierProvider(create: (context) => ChapterProvider()),
        ChangeNotifierProvider(create: (context) => CommentProvider()),
        ChangeNotifierProvider(create: (context) => RatingProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Truyện Chữ',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/welcome', // Thay đổi dòng này
      routes: routes,
    );
  }
}