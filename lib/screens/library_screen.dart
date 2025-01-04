import 'package:flutter/material.dart';

class LibraryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Thư Viện"),
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Text("Truyện trong thư viện"),
      ),
    );
  }
}