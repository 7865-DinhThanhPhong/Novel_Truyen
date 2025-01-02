package com.example.noveltruyen.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
@Table(name = "chapters")
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "chapter_number", nullable = false)
    private int chapterNumber;

    @Column
    @CreationTimestamp
    private LocalDateTime createAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "story_id")
    private Story story;

    @UpdateTimestamp
    @Column
    private LocalDateTime updateAt;

    private int view;
    @Transient
    private int test;


}