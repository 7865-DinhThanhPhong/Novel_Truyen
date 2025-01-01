package com.example.noveltruyen.Controller;

import com.example.noveltruyen.Model.User;
import com.example.noveltruyen.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    public String baseUrl = "http://localhost:8082";


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }



    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        // Kiểm tra username và password
        if (userService.checkLogin(user.getUsername(), user.getPassword())) {
            return ResponseEntity.ok(userService.findByUsername(user.getUsername()).get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setUserId(id);
        User u = userService.getUserById(id).orElse(null);
        if(u != null){
            u.setRole(user.getRole());
            u.setEmail(user.getEmail());
            u.setUsername(user.getUsername());
        }
        else return ResponseEntity.notFound().build();
        User updatedUser = userService.updateUser(u);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/edit/{userId}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long userId,
            @RequestParam("user") String userJson,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ) {
        try {
            // Chuyển đổi JSON string sang object User
            User user = new ObjectMapper().readValue(userJson, User.class);
            User userExist = userService.findByEmail(user.getEmail()).orElse(null);
            if(userService.getAllUsers().stream().filter(u -> u.getUsername().equals(user.getUsername()) ).toList().stream().count() > 0 && !userExist.getUsername().equals(user.getUsername()))
                return ResponseEntity.badRequest().body("username đã tồn tại");
            if (userExist == null)
                return ResponseEntity.notFound().build();
            // Xử lý upload avatar (nếu có)
            if (avatar != null && !avatar.isEmpty()) {
                if(user.getAvatar() != null)
                    userService.deleteImage(user.getAvatar(), baseUrl);
                String avatarUrl = userService.uploadImage(avatar); // Hàm lưu trữ avatar và trả về URL
                user.setAvatar(baseUrl + avatarUrl);
            }
            user.setPassword(userExist.getPassword());
            // Cập nhật thông tin người dùng
            User updatedUser = userService.updateUser( user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        User user = userService.getUserById(id).orElse(null);
        if(user.getAvatar().contains(baseUrl)){
            try {
                userService.deleteImage(user.getAvatar(), baseUrl);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}