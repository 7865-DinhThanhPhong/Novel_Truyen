import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../models/Chapter.dart';
import '../models/story.dart';
import '../providers/chapter_provider.dart';

class ChapterDetailScreen extends StatefulWidget {
  final Chapter chapter;
  final Story story;

  const ChapterDetailScreen({
    Key? key,
    required this.chapter,
    required this.story,
  }) : super(key: key);

  @override
  State<ChapterDetailScreen> createState() => _ChapterDetailScreenState();
}

class _ChapterDetailScreenState extends State<ChapterDetailScreen> {
  late Chapter _currentChapter;

  @override
  void initState() {
    super.initState();
    _currentChapter = widget.chapter;
    _incrementChapterView();
  }

  void _goToChapter(int index) {
    setState(() {
      _currentChapter = widget.story.chapters![index];
    });
    _incrementChapterView();
  }

  void _incrementChapterView() {
    if (_currentChapter.id != null) {
      Provider.of<ChapterProvider>(context, listen: false).setView(_currentChapter.id!);
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = widget.story.chapters!.indexOf(_currentChapter);

    return Scaffold(
      appBar: AppBar(
        title: Text(_currentChapter.title ?? 'Đọc chương'),
        actions: [
          IconButton(
            icon: const Icon(Icons.menu_book),
            onPressed: () {
              _showChapterList(context);
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title
                  Text(
                    _currentChapter.title ?? 'Chương không có tiêu đề',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  // Metadata
                  Text(
                    'Cập nhật: ${DateFormat('dd/MM/yyyy').format(_currentChapter.updateAt ?? DateTime.now())}',
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  const SizedBox(height: 16),
                  // Content
                  _currentChapter.content != null
                      ? Html(
                    data: _currentChapter.content!,
                    style: {
                      "p": Style(fontSize: FontSize.large, lineHeight: LineHeight.number(1.6)),
                    },
                  )
                      : const Text(
                    'Nội dung không khả dụng.',
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),
          ),
          // Chapter Navigation
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            decoration: const BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, -2)),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: currentIndex > 0
                      ? () => _goToChapter(currentIndex - 1)
                      : null,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Chương trước'),
                ),
                ElevatedButton.icon(
                  onPressed: currentIndex < (widget.story.chapters!.length - 1)
                      ? () => _goToChapter(currentIndex + 1)
                      : null,
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text('Chương sau'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showChapterList(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return ListView.builder(
          itemCount: widget.story.chapters?.length ?? 0,
          itemBuilder: (context, index) {
            final chapter = widget.story.chapters![index];
            return ListTile(
              title: Text(
                chapter.title ?? 'Chương ${index + 1}',
                style: const TextStyle(fontSize: 16),
              ),
              subtitle: Text(
                'Cập nhật: ${DateFormat('dd/MM/yyyy').format(chapter.updateAt ?? DateTime.now())}',
              ),
              onTap: () {
                Navigator.pop(context);
                _goToChapter(index);
              },
            );
          },
        );
      },
    );
  }
}
