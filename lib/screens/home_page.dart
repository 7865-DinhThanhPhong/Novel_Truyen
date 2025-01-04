import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/story.dart';
import '../providers/story_provider.dart';
import './all_story_screen.dart';
import './story_detail_screen.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    // Lấy dữ liệu cho cả 2 thể loại "new" và "hot"
    Provider.of<StoryProvider>(context, listen: false).fetchStories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Truyện Hay"),
        automaticallyImplyLeading: false,
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          // Lấy lại dữ liệu khi refresh
          await Provider.of<StoryProvider>(context, listen: false).fetchStories();
        },
        child: SingleChildScrollView(
          child: Column(
            children: [
              // Slider hiển thị truyện mới/hot
              _buildStorySlider(Provider.of<StoryProvider>(context, listen: false).stories),

              // Danh sách truyện mới cập nhật
              _buildStorySection(
                "Truyện Mới Cập Nhật",
                Provider.of<StoryProvider>(context, listen: false).stories,
                'New',
              ),

              // Danh sách truyện hot
              _buildStorySection(
                "Truyện Hot",
                Provider.of<StoryProvider>(context, listen: false).stories,
                '',
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Hàm hiển thị một danh sách truyện (section)
  Widget _buildStorySection(String title, List<Story> stories, String? sticker) {
    if (stories.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(child: Text("Không có truyện để hiển thị")),
      );
    }

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
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AllStoriesScreen(
                        title: title,
                        stories: stories,
                      ),
                    ),
                  );
                },
                child: Text("Xem thêm"),
              ),
            ],
          ),
        ),
        Container(
          height: 200, // Đặt chiều cao cố định
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: stories.length,
            itemBuilder: (context, index) {
              final story = stories[index];
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
                      Stack(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),
                            child: SizedBox(
                              height: 150,
                              child: Image.network(
                                story.coverImageUrl!,
                                fit: BoxFit.cover,
                                width: double.infinity,
                              ),
                            ),
                          ),
                          // Hiển thị sticker nếu có
                          if (sticker != null && sticker.isNotEmpty)
                            Positioned(
                              top: 8,
                              right: 8,
                              child: Container(
                                padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                                decoration: BoxDecoration(
                                  color: sticker == "HOT" ? Colors.red : Colors.green,
                                  borderRadius: BorderRadius.circular(4.0),
                                ),
                                child: Text(
                                  sticker,
                                  style: TextStyle(color: Colors.white, fontSize: 12),
                                ),
                              ),
                            ),
                        ],
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
        ),
      ],
    );
  }

  // Hàm hiển thị slider truyện (dùng cho danh sách HOT)
  Widget _buildStorySlider(List<Story> stories) {
    if (stories.isEmpty) {
      return Center(child: Text("Không có truyện"));
    }

    return Container(
      height: 250,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: stories.take(5).length, // Hiển thị tối đa 5 truyện
        itemBuilder: (context, index) {
          final story = stories[index];
          String stickerText = "HOT";
          Color stickerColor = Colors.red;

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
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
