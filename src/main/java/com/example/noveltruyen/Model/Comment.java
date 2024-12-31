package com.example.noveltruyen.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Thay đổi kiểu dữ liệu thành Long và thêm mapping
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Thay đổi kiểu dữ liệu thành Long và thêm mapping
    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;

    @Lob
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    private LocalDateTime updateAt;

    // Thêm các trường để hỗ trợ comment phản hồi

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent; // Tham chiếu đến comment cha (nếu là comment phản hồi)

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies; // Danh sách các comment phản hồi
}