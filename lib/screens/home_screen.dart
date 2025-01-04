import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import './login_screen.dart';
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
                  crossAxisAlignment: CrossAxisAlignment.center, // Căn giữa theo chiều ngang
                  mainAxisAlignment: MainAxisAlignment.center, // Căn giữa theo chiều dọc
                  children: [
                    Consumer<AuthProvider>(
                      builder: (context, authProvider, child) {
                        final user = authProvider.user;
                        return CircleAvatar(
                          radius: 40,
                          backgroundColor: Colors.white,
                          backgroundImage: user?.avatar != null
                              ? NetworkImage(user!.avatar!)
                              : null,
                          child: user?.avatar == null
                              ? Icon(
                            Icons.person,
                            size: 40,
                            color: Colors.grey,
                          )
                              : null,
                        );
                      },
                    ),
                    SizedBox(height: 10),
                    Consumer<AuthProvider>(
                      builder: (context, authProvider, child) {
                        final user = authProvider.user;
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.center, // Căn giữa text
                          children: [
                            Text(
                              user?.email ?? 'Email chưa cập nhật',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 2),
                            Text(
                              user?.username ?? 'Tên người dùng',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.home, color: Colors.deepPurple),
              title: Text('Trang chủ', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context); // Đóng drawer
                setState(() {
                  _currentIndex = 0; // Chuyển về trang chủ
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.category, color: Colors.deepPurple),
              title: Text('Thể loại', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  _currentIndex = 1; // Chuyển đến trang Thể loại
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.library_books, color: Colors.deepPurple),
              title: Text('Thư viện', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  _currentIndex = 2; // Chuyển đến trang Thư viện
                });
              },
            ),
            Divider(height: 1, color: Colors.grey),
            ListTile(
              leading: Icon(Icons.settings, color: Colors.deepPurple),
              title: Text('Cài đặt', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Xử lý khi chọn Cài đặt (nếu cần)
              },
            ),
            ListTile(
              leading: Icon(Icons.info, color: Colors.deepPurple),
              title: Text('Giới thiệu', style: TextStyle(fontSize: 16)),
              onTap: () {
                Navigator.pop(context);
                // Xử lý khi chọn Giới thiệu (nếu cần)
              },
            ),
            Divider(height: 1, color: Colors.grey),
            ListTile(
              leading: Icon(Icons.logout, color: Colors.deepPurple),
              title: Text('Đăng xuất', style: TextStyle(fontSize: 16)),
              onTap: () async {
                Navigator.pop(context); // Đóng drawer
                await Provider.of<AuthProvider>(context, listen: false).logout();
                Navigator.pushReplacementNamed(context, '/login'); // Chuyển đến màn hình đăng nhập
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