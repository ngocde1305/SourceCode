package com.web.nl.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.Category;
import com.web.nl.repositories.CategoryRepository;
@Service
public class CategoryService {
	@Autowired
	CategoryRepository cataRepo;
	public List<String> listName(){
		List<String> list = new ArrayList<String>();
		List<Category> cataList= cataRepo.findAll();
		cataList.forEach(c->list.add(c.getName()));
		return list;
	}
}
