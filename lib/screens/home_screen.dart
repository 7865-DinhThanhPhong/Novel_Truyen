import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import './login_screen.dart';
import '../providers/story_provider.dart';
import './story_detail_screen.dart';
import './home_page.dart';
import './categories_screen.dart';
import './library_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    HomePage(),
    CategoriesScreen(),
    LibraryScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Truyện Hay"),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await Provider.of<AuthProvider>(context, listen: false).logout();
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.deepPurple, Colors.purpleAccent],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Consumer<AuthProvider>(
                      builder: (context, authProvider, child) {
                        final user = authProvider.user;
                        return CircleAvatar(
                          radius: 40, // Tăng kích thước avatar
                          backgroundColor: Colors.white,
                          backgroundImage: user?.avatar != null
                              ? NetworkImage(user!.avatar!)
                              : null, // Sử dụng backgroundImage thay vì child
                          child: user?.avatar == null
                              ? Icon(
                            Icons.person,
                            size: 40,
                            color: Colors.grey,
                          )
                              : null, // Ẩn icon nếu có avatar
                        );
                      },
                    ),
                    SizedBox(height: 10),
                    Consumer<AuthProvider>(
                      builder: (context, authProvider, child) {
                        final user = authProvider.user;
                        return Expanded( // Bọc Column trong Expanded
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user?.email ?? 'Email chưa cập nhật',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16, // Giảm fontSize
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 2), // Giảm height
                              Text(
                                user?.username ?? 'Tên người dùng',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 13, // Giảm fontSize
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.home, color: Colors.deepPurple),
              title: Text('Trang chủ', style: TextStyle(fontSize: 16)), // Tăng kích thước font chữ
              onTap: () {
                Navigator.pop(context); // Đóng drawer
              },
            ),
            ListTile(
              leading: Icon(Icons.category, color: Colors.deepPurple),
              title: Text('Thể loại', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Chuyển đến trang Thể loại (nếu cần)
              },
            ),
            ListTile(
              leading: Icon(Icons.library_books, color: Colors.deepPurple),
              title: Text('Thư viện', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Chuyển đến trang Thư viện (nếu cần)
              },
            ),
            Divider(height: 1, color: Colors.grey), // Thêm đường phân cách
            ListTile(
              leading: Icon(Icons.settings, color: Colors.deepPurple),
              title: Text('Cài đặt', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Xử lý khi chọn Cài đặt
              },
            ),
            ListTile(
              leading: Icon(Icons.info, color: Colors.deepPurple),
              title: Text('Giới thiệu', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Xử lý khi chọn Giới thiệu
              },
            ),
          ],
        ),
      ),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Trang chủ',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.category),
            label: 'Thể loại',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.library_books),
            label: 'Thư viện',
          ),
        ],
      ),
    );
  }
}

// Các màn hình (HomePage, CategoriesScreen, LibraryScreen) được tách ra thành các file riêng
// để code dễ đọc và quản lý hơn.