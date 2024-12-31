package com.example.noveltruyen.Service;
import com.example.noveltruyen.Model.User;
import com.example.noveltruyen.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }



    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkLogin(String username, String password) {

        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public String uploadImage(MultipartFile posterFile) throws IOException {
        if(posterFile == null || posterFile.isEmpty()){
            return null;
        }
        String uploadsDir = "target/classes/static/images/";
        Path uploadPath = Paths.get(uploadsDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = posterFile.getOriginalFilename();
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String UUIDname = UUID.randomUUID().toString() + fileExtension;

        Path filePath = uploadPath.resolve(UUIDname);
        Files.copy(posterFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/images/" + UUIDname;
    }

    public void deleteImage(String imageUrl, String baseUrl) throws IOException {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);


            String imagePath1 = "target/classes/static/images/" + imageName;

            Path filePath1 = Paths.get (imagePath1);
            Files.deleteIfExists(filePath1);
        }
    }
}