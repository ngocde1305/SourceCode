package com.web.nl.payload.response;

public class District {
	private String id;
	private String name;
	private String full_name;
	public String getFull_name() {
		return full_name;
	}
	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public District(String id, String name, String full_name) {
		super();
		this.id = id;
		this.name = name;
		this.full_name = full_name;
	}
	
}
