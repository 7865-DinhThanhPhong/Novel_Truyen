import 'package:flutter/material.dart';

class CategoriesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Thể Loại"),
      ),
      body: Center(
        child: Text("Danh sách thể loại"),
      ),
    );
  }
}