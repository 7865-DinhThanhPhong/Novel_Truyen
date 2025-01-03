// screens/login_screen.dart
import 'package:flutter/material.dart';
import 'package:novel_truyen/screens/home_screen.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart'; // Thay truyen_chu bằng tên package của bạn
import './home_page.dart'; // Thay truyen_chu bằng tên package của bạn
import './register_screen.dart';
import './home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submitLogin() async {
    if (_formKey.currentState!.validate()) {
      bool success = await Provider.of<AuthProvider>(context, listen: false)
          .login(_emailController.text, _passwordController.text);
      if (success) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => HomeScreen()),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Đăng nhập thất bại!')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Đăng nhập"),
        ),
        body: Padding(
        padding: const EdgeInsets.all(16.0),
    child: Form(
    key: _formKey,
    child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
    TextFormField(
    controller: _emailController,
    decoration: InputDecoration(
    labelText: "Email",
    prefixIcon: Icon(Icons.email),
    border: OutlineInputBorder(),
    ),
    keyboardType: TextInputType.emailAddress,
    validator: (value) {
    if (value == null || value.isEmpty) {
    return 'Vui lòng nhập email';
    }
    if (!value.contains('@')) {
    return 'Email không hợp lệ';
    }
    return null;
    },
    ),
    SizedBox(height: 16),
    TextFormField(
    controller: _passwordController,
    decoration: InputDecoration(
    labelText: "Mật khẩu",
    prefixIcon: Icon(Icons.lock),
    border: OutlineInputBorder(),
    ),
    obscureText: true,
    validator: (value) {
    if (value == null || value.isEmpty) {
    return 'Vui lòng nhập mật khẩu';
    }
    return null;
    },
    ),
    SizedBox(height: 24),
    ElevatedButton(
    onPressed: _submitLogin,
    child: Text("Đăng nhập"),
    style: ElevatedButton.styleFrom(
    padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
    textStyle: TextStyle(fontSize: 18),
    ),
    ),
      // screens/login_screen.dart (tiếp theo)
      SizedBox(height: 16),
      TextButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => RegisterScreen()),
          );
        },
        child: Text("Chưa có tài khoản? Đăng ký ngay"),
      ),
    ],
    ),
    ),
        ),
    );
  }
}