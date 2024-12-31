package com.example.noveltruyen.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Tên đăng nhập không được để trống")
    @Length(max = 255, message = "Tên đăng nhập không được dài quá 255 ký tự")
    private String username;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Length(max = 255, message = "Mật khẩu không được dài quá 255 ký tự")
    private String password;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    private String avatar; //avatar cua user
    private String role; // Ví dụ: "USER" hoặc "ADMIN"

    @ElementCollection
    @CollectionTable(name = "user_favorite_stories", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "story_id")
    private List<Long> favoriteStories;

}