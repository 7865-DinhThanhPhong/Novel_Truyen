// routes.dart
import 'package:flutter/material.dart';
import './screens/home_page.dart'; // Thay truyen_chu bằng tên package của bạn
import './screens/login_screen.dart'; // Thay truyen_chu bằng tên package của bạn
import './screens/register_screen.dart'; // Thay truyen_chu bằng tên package của bạn
import './screens/welcome_screen.dart'; // Thay truyen_chu bằng tên package của bạn
import 'package:provider/provider.dart';
import './providers/auth_provider.dart';
import './screens/story_detail_screen.dart';
import './screens/home_screen.dart';

final Map<String, WidgetBuilder> routes = {
  '/welcome': (context) => WelcomeScreen(),
  '/login': (context) => LoginScreen(),
  '/register': (context) => RegisterScreen(),
  '/home': (context) => Consumer<AuthProvider>(
    builder: (context, authProvider, child) {
      if (authProvider.isLoggedIn) {
        return HomeScreen();
      } else {
        return LoginScreen();
      }
    },
  ),
  '/story': (context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final storyId = args['storyId'] as int;
    return StoryDetailScreen(storyId: storyId);
  },
};