package com.example.noveltruyen.Model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "histories") // Đổi tên bảng thành "histories"
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column( nullable = false)
    private Long userId;

    @Column( nullable = false)
    private Long storyId;

    @Column( nullable = false)
    private Long chapterId;

    //Lưu thời gian mới nhất
    @Column(name = "created_at")
    @UpdateTimestamp
    private LocalDateTime createdAt;
}