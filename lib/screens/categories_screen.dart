import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import '../providers/category_provider.dart';
import '../providers/story_provider.dart';
import './all_story_screen.dart';

class CategoriesScreen extends StatefulWidget {
  @override
  _CategoriesScreenState createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  @override
  void initState() {
    super.initState();
    Provider.of<CategoryProvider>(context, listen: false).fetchCategories();
  }

  Color _getRandomColor() {
    Random random = Random();
    return Color.fromARGB(
      255,
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Thể Loại"),
        automaticallyImplyLeading: false,
      ),
      body: Consumer2<CategoryProvider, StoryProvider>(
        builder: (context, categoryProvider, storyProvider, child) {
          if (categoryProvider.isLoading) {
            return Center(child: CircularProgressIndicator());
          } else if (categoryProvider.categories.isEmpty) {
            return Center(child: Text("Không có thể loại"));
          } else {
            return GridView.builder(
              padding: EdgeInsets.all(16.0),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 16.0,
                mainAxisSpacing: 16.0,
                childAspectRatio: 1.2,
              ),
              itemCount: categoryProvider.categories.length,
              itemBuilder: (context, index) {
                final category = categoryProvider.categories[index];
                return GestureDetector(
                  onTap: () {
                    // Lọc danh sách các story theo category được chọn
                    final filteredStories = storyProvider.stories.where((story) {
                      return story.categories != null &&
                          story.categories!.any((cat) => cat.id == category.id);
                    }).toList();

                    // Điều hướng đến AllStoriesScreen
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => AllStoriesScreen(
                          title: category.name ?? "Danh sách truyện",
                          stories: filteredStories,
                        ),
                      ),
                    );
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      color: _getRandomColor(),
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    child: Center(
                      child: Text(
                        category.name ?? 'N/A',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
