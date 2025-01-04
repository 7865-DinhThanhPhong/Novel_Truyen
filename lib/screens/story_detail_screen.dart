import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/story.dart';
import '../models/comment.dart';
import '../providers/rating_provider.dart';
import '../providers/story_provider.dart';
import 'package:flutter_html/flutter_html.dart';
import './chapter_detail_screen.dart';
import '../providers/comment_provider.dart';
import '../providers/auth_provider.dart';
import 'package:emoji_picker_flutter/emoji_picker_flutter.dart';

class StoryDetailScreen extends StatefulWidget {
  final int storyId;

  const StoryDetailScreen({Key? key, required this.storyId}) : super(key: key);

  @override
  _StoryDetailScreenState createState() => _StoryDetailScreenState();
}

class _StoryDetailScreenState extends State<StoryDetailScreen> {
  int _currentIndex = 0; // Chỉ số tab hiện tại
  final TextEditingController _commentController = TextEditingController(); // Controller cho text field

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<StoryProvider>(context, listen: false)
          .fetchStoryDetails(widget.storyId);
      Provider.of<CommentProvider>(context, listen: false).fetchCommentsForStory(widget.storyId);
      Provider.of<RatingProvider>(context, listen: false).fetchUserRating(widget.storyId);
    });
  }
  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
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
          const SizedBox(height: 16),
          Text(
            'Tác giả: ${story.author ?? 'N/A'}',
            style: const TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 8),
          // Row(
          //   children: [
          //     Text('Thể loại: ', style: const TextStyle(fontSize: 18)),
          //     const SizedBox(width: 10,),
          //     Text('${story.categories?.map((c) => c.name).join(', ') ?? 'N/A'}',
          //       style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          //     ),
          //   ],
          // ),
          Text(
            'Thể loại: ${story.categories?.map((c) => c.name).join(', ') ?? 'N/A'}',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'Ngày cập nhật: ${DateFormat('dd/MM/yyyy').format(story.updatedAt ?? DateTime.now())}',
            style: const TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 8),
          Text(
            'Lượt xem: ${story.views ?? 0}',
            style: const TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 16),
          _buildRatingSection(story),
          const SizedBox(height: 16),
          Text(
            'Giới thiệu',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          if (story.descriptionShow != null) Html(
            data: story.descriptionShow!,
            style: {
              "p": Style(
                fontSize: FontSize.large,
                lineHeight: LineHeight.number(1.5),
              ),
              "img": Style(

              ),
            },

          ) else const Text(
            'Không có nội dung mô tả.',
            style: TextStyle(fontSize: 16),
          ),

        ],
      ),
    );
  }


  Widget _buildRatingSection(Story story) {
    return Consumer<RatingProvider>(
      builder: (context, ratingProvider, child) {
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
                  rating: 4,
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
                  '(${5} / 5)',
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
              initialRating: ratingProvider.userRating ?? 0, // Use fetched user rating
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
                _rateStory(story.id!, rating);
              },
            ),

          ],
        );
      },
    );
  }

  void _rateStory(int storyId, double rating) {
    final ratingProvider = Provider.of<RatingProvider>(context, listen: false);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    if (authProvider.isLoggedIn) {
      ratingProvider.rateStory(storyId, rating).then((_) {
        // Refresh story details to update average rating
        Provider.of<StoryProvider>(context, listen: false).fetchStoryDetails(storyId);
        // Optionally, show a success message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Đánh giá của bạn đã được ghi nhận.")),
        );
      }).catchError((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Có lỗi xảy ra khi gửi đánh giá: ${error.toString()}")),
        );
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Bạn cần đăng nhập để đánh giá truyện.")),
      );
      // Optionally, navigate to the login screen
      // Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen()));
    }
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
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ChapterDetailScreen(
                    chapter: chapter,
                    story: story,
                  ),
                ),
              );
            },
          ),
        );
      },
    );
  }

  // Phần bình luận
  Widget _buildComments(Story story) {
    return Consumer<CommentProvider>(
      builder: (context, commentProvider, child) {
        final comments = commentProvider.comments;

        return Column(
          children: [
            Expanded(
              child: comments.isEmpty
                  ? const Center(child: Text('Chưa có bình luận nào.'))
                  : ListView.builder(
                itemCount: comments.length,
                itemBuilder: (context, index) {
                  final comment = comments[index];
                  return _buildCommentItem(comment);
                },
              ),
            ),
            _buildCommentInput(),
          ],
        );
      },
    );
  }

  Widget _buildCommentItem(Comment comment, {int level = 0}) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final user = comment.user;
    final isCurrentUserComment = authProvider.isLoggedIn && authProvider.user?.userId == user?.userId;

    return Card(
      margin: EdgeInsets.only(left: 16.0 * level, top: 4, bottom: 4, right: 8),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundImage: user?.avatar != null
                      ? NetworkImage(user!.avatar!)
                      : const NetworkImage('https://via.placeholder.com/150'),
                  radius: 20,
                ),
                const SizedBox(width: 8),
                Text(
                  user?.username ?? 'Anonymous',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const Spacer(),
                if (isCurrentUserComment)
                  PopupMenuButton<String>(
                    onSelected: (String item) {
                      switch (item) {
                        case 'edit':
                          _showEditCommentDialog(comment);
                          break;
                        case 'delete':
                          _deleteComment(comment.id!);
                          break;
                      }
                    },
                    itemBuilder: (BuildContext context) {
                      return {'edit', 'delete'}.map((String choice) {
                        return PopupMenuItem<String>(
                          value: choice.toLowerCase(), // Convert to lowercase
                          child: Text(choice),
                        );
                      }).toList();
                    },
                  ),

              ],
            ),
            const SizedBox(height: 8),
            Text(comment.content ?? ''),
            const SizedBox(height: 8),
            Text(
              DateFormat('dd/MM/yyyy HH:mm').format(comment.createdAt ?? DateTime.now()),
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
            // Nút phản hồi
            Align(
              alignment: Alignment.bottomRight,
              child: TextButton(
                onPressed: () {
                  // Xử lý phản hồi
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      final TextEditingController replyController = TextEditingController();
                      return AlertDialog(
                        title: Text("Phản hồi bình luận"),
                        content: TextField(
                          controller: replyController,
                          decoration: InputDecoration(hintText: "Nhập phản hồi của bạn..."),
                          autofocus: true,
                        ),
                        actions: <Widget>[
                          TextButton(
                            child: Text("Hủy"),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                          TextButton(
                            child: Text("Gửi"),
                            onPressed: () {
                              final replyContent = replyController.text.trim();
                              if (replyContent.isNotEmpty) {
                                _postComment(comment.id, replyContent); // Pass parentId here
                                Navigator.of(context).pop();
                              }
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
                child: Text("Phản hồi"),
              ),
            ),
            // Hiển thị các phản hồi (nếu có)
            if (comment.replies != null && comment.replies!.isNotEmpty)
              ...comment.replies!.map((reply) => _buildCommentItem(reply, level: level + 1)).toList(),
          ],
        ),
      ),
    );
  }

  Widget _buildCommentInput() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _commentController,
              decoration: const InputDecoration(
                hintText: 'Nhập bình luận...',
                border: OutlineInputBorder(),
              ),
              textInputAction: TextInputAction.send, // Allows sending comment on pressing "Enter"
              onSubmitted: (_) => _postComment(null,_commentController.text), // Call _postComment when "Enter" is pressed
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send),
            onPressed: () {
              _postComment(null,_commentController.text);
            },
          ),
        ],
      ),
    );
  }

  void _postComment(int? parentId, String content) {
    final commentText = content;
    if (commentText.isNotEmpty) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      if (authProvider.isLoggedIn) {
        Provider.of<CommentProvider>(context, listen: false).postComment(
            widget.storyId,
            commentText,
            parentId: parentId
        ).then((_) {
          _commentController.clear();
          Provider.of<CommentProvider>(context, listen: false).fetchCommentsForStory(widget.storyId);
        }).catchError((error) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text("Failed to post comment: ${error.toString()}")),
          );
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("You must be logged in to post a comment.")),
        );
      }
    }
  }
  void _showEditCommentDialog(Comment comment) {
    final TextEditingController editController = TextEditingController(text: comment.content);
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Chỉnh sửa bình luận"),
          content: TextField(
            controller: editController,
            decoration: InputDecoration(hintText: "Nhập nội dung mới..."),
            autofocus: true,
          ),
          actions: <Widget>[
            TextButton(
              child: Text("Hủy"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text("Cập nhật"),
              onPressed: () {
                final updatedContent = editController.text.trim();
                if (updatedContent.isNotEmpty) {
                  _updateComment(comment.id!, updatedContent);
                  Navigator.of(context).pop();
                }
              },
            ),
          ],
        );
      },
    );
  }

  void _deleteComment(int commentId) {
    Provider.of<CommentProvider>(context, listen: false).deleteComment(commentId)
        .then((_) {
      // Có thể hiển thị thông báo xóa thành công
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Đã xóa bình luận")),
      );
    })
        .catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Lỗi khi xóa bình luận: ${error.toString()}")),
      );
    });
  }

  void _updateComment(int commentId, String newContent) {
    Provider.of<CommentProvider>(context, listen: false).updateComment(commentId, newContent)
        .then((_) {
      // Có thể hiển thị thông báo cập nhật thành công
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Đã cập nhật bình luận")),
      );
    })
        .catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Lỗi khi cập nhật bình luận: ${error.toString()}")),
      );
    });
  }

}

