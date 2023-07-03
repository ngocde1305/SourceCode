package com.web.nl.models;

import java.time.LocalDate;

import jakarta.persistence.Id;

public class Comment {
	@Id
	private String id;
	private String content;
	private LocalDate createAt;
	private User user;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public LocalDate getCreateAt() {
		return createAt;
	}
	public void setCreateAt(LocalDate createAt) {
		this.createAt = createAt;
	}
	public Comment(String id, String content, LocalDate createAt, User user) {
		super();
		this.id = id;
		this.content = content;
		this.createAt = createAt;
		this.user = user;
	}
	public Comment() {
		super();
	}
}
