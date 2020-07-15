package com.vride.pooling.representation;

import java.util.Date;

import com.vride.pooling.model.DAOTrip;

public class Intermediary {
	private Long id;
	private String place;
	private Date start_at;
	private DAOTrip trip;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public Date getStart_at() {
		return start_at;
	}
	public void setStart_at(Date start_at) {
		this.start_at = start_at;
	}
	public DAOTrip getTrip() {
		return trip;
	}
	public void setTrip(DAOTrip trip) {
		this.trip = trip;
	}
	
	
}
