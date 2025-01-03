import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/story.dart';
import '../providers/story_provider.dart';

class StoryDetailScreen extends StatefulWidget {
  final int storyId;

  const StoryDetailScreen({Key? key, required this.storyId}) : super(key: key);

  @override
  _StoryDetailScreenState createState() => _StoryDetailScreenState();
}

class _StoryDetailScreenState extends State<StoryDetailScreen> {
  int _currentIndex = 0; // Chỉ số tab hiện tại

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<StoryProvider>(context, listen: false)
          .fetchStoryDetails(widget.storyId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi tiết truyện'),
      ),
      body: Consumer<StoryProvider>(
        builder: (context, storyProvider, child) {
          final story = storyProvider.stories.firstWhere(
                (s) => s.id == widget.storyId,
            orElse: () => Story(),
          );

          if (story.id == null) {
            return Center(child: CircularProgressIndicator());
          }

          return IndexedStack(
            index: _currentIndex,
            children: [
              _buildStoryInfo(story), // Phần thông tin
              _buildChapters(story), // Danh sách chương
              _buildComments(story), // Bình luận
            ],
          );
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.info), label: 'Thông tin'),
          BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: 'Chương'),
          BottomNavigationBarItem(icon: Icon(Icons.comment), label: 'Bình luận'),
        ],
      ),
    );
  }

  // Phần thông tin
  Widget _buildStoryInfo(Story story) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: story.coverImageUrl != null
                ? Image.network(
              story.coverImageUrl!,
              fit: BoxFit.cover,
              width: double.infinity,
              height: 250,
            )
                : Container(),
          ),
          SizedBox(height: 16),
          Text(
            'Tác giả: ${story.author ?? 'N/A'}',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 8),
          Text(
            'Thể loại: ${story.categories?.map((c) => c.name).join(', ') ?? 'N/A'}',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 8),
          Text(
            'Ngày cập nhật: ${DateFormat('dd/MM/yyyy').format(story.updatedAt ?? DateTime.now())}',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 8),
          Text(
            'Lượt xem: ${story.views ?? 0}',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 16),
          Text(
            'Giới thiệu',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            story.description ?? 'N/A',
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 16),
          _buildRatingSection(story),
        ],
      ),
    );
  }

  Widget _buildRatingSection(Story story) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Đánh giá',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            RatingBarIndicator(
              rating: 4.5,
              itemBuilder: (context, index) => Icon(
                Icons.star,
                color: Colors.amber,
              ),
              itemCount: 5,
              itemSize: 24,
              direction: Axis.horizontal,
            ),
            SizedBox(width: 10),
            Text(
              '(0 lượt đánh giá)',
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
        SizedBox(height: 16),
        Text(
          'Đánh giá của bạn:',
          style: TextStyle(fontSize: 18),
        ),
        SizedBox(height: 8),
        RatingBar.builder(
          initialRating: 5,
          minRating: 1,
          direction: Axis.horizontal,
          allowHalfRating: true,
          itemCount: 5,
          itemSize: 30,
          itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
          itemBuilder: (context, _) => Icon(
            Icons.star,
            color: Colors.amber,
          ),
          onRatingUpdate: (rating) {
            // Gửi đánh giá về backend
          },
        ),
      ],
    );
  }

  // Phần danh sách chương
  Widget _buildChapters(Story story) {
    return story.chapters == null || story.chapters!.isEmpty
        ? Center(child: Text('Chưa có chương nào'))
        : ListView.builder(
      padding: EdgeInsets.all(8),
      itemCount: story.chapters?.length ?? 0,
      itemBuilder: (context, index) {
        final chapter = story.chapters![index];
        return Card(
          child: ListTile(
            title: Text(chapter.title ?? 'N/A'),
            subtitle: Text('Cập nhật: ${DateFormat('dd/MM/yyyy').format(chapter.updateAt ?? DateTime.now())}'),
            onTap: () {
              // Chuyển đến chi tiết chương
            },
          ),
        );
      },
    );
  }

  // Phần bình luận
  Widget _buildComments(Story story) {
    return Center(
      child: Text('Phần bình luận sẽ ở đây'),
    );
  }
}
