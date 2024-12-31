package com.example.noveltruyen.Service;

import com.example.noveltruyen.Model.Category;
import com.example.noveltruyen.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories (){
        return categoryRepository.findAll();
    }

    public Optional<Category> getById (Long id){
        return categoryRepository.findById(id);
    }

    public Category getByName  (String name) {
        return categoryRepository.finByName(name);
    }

    public Category Save (Category category){
        return  categoryRepository.save(category);
    }

    public void Delete (Category category){
        categoryRepository.delete(category);
    }


}
