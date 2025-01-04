import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../models/story.dart';
import '../providers/story_provider.dart';
import 'story_detail_screen.dart';

class AllStoriesScreen extends StatefulWidget {
  final String title; // Nhận title thay vì category
  final List<Story> stories; // Nhận danh sách stories để hiển thị

  AllStoriesScreen({required this.title, required this.stories});

  @override
  _AllStoriesScreenState createState() => _AllStoriesScreenState();
}

class _AllStoriesScreenState extends State<AllStoriesScreen> {
  String _sortOption = 'views'; // Default sort by views

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title), // Dùng title để hiển thị tên trang
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              setState(() {
                _sortOption = value;
              });
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'views',
                child: Row(
                  children: [
                    Icon(Icons.remove_red_eye, size: 20),
                    SizedBox(width: 8),
                    Text('Sắp xếp theo lượt xem'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'date',
                child: Row(
                  children: [
                    Icon(Icons.calendar_today, size: 20),
                    SizedBox(width: 8),
                    Text('Sắp xếp theo ngày cập nhật'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: Consumer<StoryProvider>(
        builder: (context, storyProvider, child) {
          if (storyProvider.isLoading) {
            return Center(child: CircularProgressIndicator());
          } else if (widget.stories.isEmpty) {
            return Center(child: Text("Không có truyện"));
          } else {
            // Sort the list of stories
            List<Story> sortedStories = List.from(widget.stories);
            if (_sortOption == 'views') {
              sortedStories.sort((a, b) => (b.views ?? 0).compareTo(a.views ?? 0));
            } else if (_sortOption == 'date') {
              sortedStories.sort((a, b) => (b.updatedAt ?? DateTime(0)).compareTo(a.updatedAt ?? DateTime(0)));
            }

            return ListView.builder(
              itemCount: sortedStories.length,
              itemBuilder: (context, index) {
                final story = sortedStories[index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  child: ListTile(
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: story.coverImageUrl != null
                          ? Image.network(
                        story.coverImageUrl!,
                        width: 50,
                        height: 70,
                        fit: BoxFit.cover,
                      )
                          : Container(
                        width: 50,
                        height: 70,
                        color: Colors.grey[300],
                        child: Icon(Icons.image, color: Colors.grey[600]),
                      ),
                    ),
                    title: Text(
                      story.title ?? 'N/A',
                      style: TextStyle(fontWeight: FontWeight.bold),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.person, size: 16),
                            SizedBox(width: 4),
                            Text(' ${story.author ?? 'N/A'}', style: TextStyle(fontSize: 14)),
                          ],
                        ),
                        // Row for chapters, views, and updated date
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(Icons.list, size: 16),
                                SizedBox(width: 4),
                                Text(' ${story.chapters?.length ?? 0}', style: TextStyle(fontSize: 14)),
                              ],
                            ),
                            Row(
                              children: [
                                Icon(Icons.remove_red_eye, size: 16),
                                SizedBox(width: 4),
                                Text('  ${story.views ?? 0}', style: TextStyle(fontSize: 14)),
                              ],
                            ),
                            Row(
                              children: [
                                Icon(Icons.calendar_today, size: 16),
                                SizedBox(width: 4),
                                Text(
                                  ' ${DateFormat('dd/MM/yyyy').format(story.updatedAt ?? DateTime.now())}',
                                  style: TextStyle(fontSize: 14),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => StoryDetailScreen(storyId: story.id!),
                        ),
                      );
                    },
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

