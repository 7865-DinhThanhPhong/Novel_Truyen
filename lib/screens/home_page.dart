import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/story_provider.dart';
import './story_detail_screen.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    Provider.of<StoryProvider>(context, listen: false).fetchStories();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        await Provider.of<StoryProvider>(context, listen: false).fetchStories();
      },
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Slider
            _buildStorySlider(),

            // Danh sách truyện mới cập nhật
            _buildStorySection("Truyện Mới Cập Nhật", "new"),

            // Danh sách truyện hot
            _buildStorySection("Truyện Hot", "hot"),
          ],
        ),
      ),
    );
  }

  Widget _buildStorySlider() {
    return Consumer<StoryProvider>(
      builder: (context, storyProvider, child) {
        if (storyProvider.isLoading) {
          return Center(child: CircularProgressIndicator());
        } else if (storyProvider.stories.isEmpty) {
          return Center(child: Text("Không có truyện"));
        } else {
          return Container(
            height: 250,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: storyProvider.stories.take(5).length,
              itemBuilder: (context, index) {
                final story = storyProvider.stories[index];
                String stickerText = "NEW";
                Color stickerColor = Colors.green;

                if (index % 2 == 0) {
                  stickerText = "HOT";
                  stickerColor = Colors.red;
                }

                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => StoryDetailScreen(storyId: story.id!),
                      ),
                    );
                  },
                  child: Container(
                    width: 180,
                    margin: EdgeInsets.symmetric(horizontal: 5.0),
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Stack(
                      children: [
                        // Hình ảnh truyện
                        ClipRRect(
                          borderRadius: BorderRadius.circular(8.0),
                          child: story.coverImageUrl != null
                              ? Image.network(
                            story.coverImageUrl!,
                            fit: BoxFit.cover,
                            width: double.infinity,
                            height: double.infinity,
                          )
                              : Container(),
                        ),
                        // Sticker "New" or "Hot"
                        Positioned(
                          top: 8,
                          right: 8,
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                            decoration: BoxDecoration(
                              color: stickerColor,
                              borderRadius: BorderRadius.circular(4.0),
                            ),
                            child: Text(
                              stickerText,
                              style: TextStyle(color: Colors.white, fontSize: 12),
                            ),
                          ),
                        ),
                        // Title truyện
                        Positioned(
                          bottom: 0,
                          left: 0,
                          right: 0,
                          child: Container(
                            padding: EdgeInsets.all(8.0),
                            color: Colors.black.withOpacity(0.5),
                            child: Text(
                              story.title ?? 'Tiêu đề truyện',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        // Tổng số chương
                        Positioned(
                          top: 8,
                          left: 8,
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                            decoration: BoxDecoration(
                              color: Colors.black.withOpacity(0.5),
                              borderRadius: BorderRadius.circular(4.0),
                            ),
                            child: Text(
                              'Chương: ${story.chapters?.length ?? 0}',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 12.0,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          );
        }
      },
    );
  }

  Widget _buildStorySection(String title, String category) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () {
                  // Chuyển đến trang danh sách đầy đủ
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AllStoriesScreen(category: category),
                    ),
                  );
                },
                child: Text("Xem thêm"),
              ),
            ],
          ),
        ),
        Consumer<StoryProvider>(
          builder: (context, storyProvider, child) {
            if (storyProvider.isLoading) {
              return Center(child: CircularProgressIndicator());
            } else if (storyProvider.stories.isEmpty) {
              return Center(child: Text("Không có truyện"));
            } else {
              return Container(
                height: 200,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: storyProvider.stories.take(5).length, // Hiển thị 5 truyện đầu tiên
                  itemBuilder: (context, index) {
                    final story = storyProvider.stories[index];
                    return GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => StoryDetailScreen(storyId: story.id!),
                          ),
                        );
                      },
                      child: Container(
                        width: 120,
                        margin: EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: Image.network(
                                story.coverImageUrl!,
                                fit: BoxFit.cover,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              story.title!,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              );
            }
          },
        ),
      ],
    );
  }
}

// Màn hình danh sách truyện đầy đủ
class AllStoriesScreen extends StatelessWidget {
  final String category;

  AllStoriesScreen({required this.category});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(category == "new" ? "Truyện Mới Cập Nhật" : "Truyện Hot"),
      ),
      body: Consumer<StoryProvider>(
        builder: (context, storyProvider, child) {
          if (storyProvider.isLoading) {
            return Center(child: CircularProgressIndicator());
          } else if (storyProvider.stories.isEmpty) {
            return Center(child: Text("Không có truyện"));
          } else {
            return ListView.builder(
              itemCount: storyProvider.stories.length,
              itemBuilder: (context, index) {
                final story = storyProvider.stories[index];
                return ListTile(
                  title: Text(story.title!),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => StoryDetailScreen(storyId: story.id!),
                      ),
                    );
                  },
                );
              },
            );
          }
        },
      ),
    );
  }
}