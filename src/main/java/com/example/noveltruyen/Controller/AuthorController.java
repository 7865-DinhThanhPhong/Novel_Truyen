package com.example.noveltruyen.Controller;

import com.example.noveltruyen.Model.User;
import com.example.noveltruyen.Service.JwtService;
import com.example.noveltruyen.Service.UserService;
import jakarta.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthorController {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${JWT_SECRET_KEY}")
    private String jwtSecret;

    @Value("${JWT_EXPIRATION_MS}")
    private int jwtExpirationMs;

    @Autowired
    private JwtService jwtService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("UserName da ton tai");
        }
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email da ton tai");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> Adminlogin(@RequestBody User user, HttpSession session) {
        User u = userService.findByEmail(user.getEmail()).orElse(null);
        if (u != null && passwordEncoder.matches(user.getPassword(), u.getPassword()) && u.getRole().contains("ADMIN")) {


            session.setAttribute("admin", u);
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        User u = userService.findByEmail(user.getEmail()).orElse(null);
        if (u != null && passwordEncoder.matches(user.getPassword(), u.getPassword())) {


            session.setAttribute("user", u);
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Xóa session
        return ResponseEntity.ok("Đăng xuất thành công!");
    }

//    @PostMapping("/admin/logout")
//    public ResponseEntity<?> Adminlogout(HttpSession session) {
//        session.invalidate(); // Xóa session
//        return ResponseEntity.ok("Đăng xuất thành công!");
//    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            // Xử lý trường hợp user chưa đăng nhập
            return ResponseEntity.notFound().build();
        }
    }

}


