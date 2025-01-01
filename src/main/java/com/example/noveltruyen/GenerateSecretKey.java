package com.example.noveltruyen;
import org.apache.commons.lang3.RandomStringUtils;

public class GenerateSecretKey {

    public static String generateSecretKey(int length) {
        // Sử dụng Apache Commons Lang để tạo chuỗi ngẫu nhiên
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+";
        return RandomStringUtils.random(length, characters);
    }

    public static void main(String[] args) {
        String secretKey = generateSecretKey(64); // Tạo khóa bí mật với độ dài 32 ký tự
        System.out.println(secretKey);
    }
}