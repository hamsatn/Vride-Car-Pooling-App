package com.vride.pooling.representation;

import com.vride.pooling.model.DAOUser;
import java.util.Date;
import java.util.List;

public class Trip {
	private String source;
	private String destination;
	private Date start_at;
	private Long id;
	private List<Intermediary> intermediary;
	private DAOUser user;
	private float price;
	private int noOfConfirmedRiders;
	
	
	
	public int getNoOfConfirmedRiders() {
		return noOfConfirmedRiders;
	}
	public void setNoOfConfirmedRiders(int noOfConfirmedRiders) {
		this.noOfConfirmedRiders = noOfConfirmedRiders;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public DAOUser getUser() {
		return user;
	}
	public void setUser(DAOUser user) {
		this.user = user;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public Date getStart_at() {
		return start_at;
	}
	public void setStart_at(Date start_at) {
		this.start_at = start_at;
	}
	public List<Intermediary> getIntermediary() {
		return intermediary;
	}
	public void setIntermediary(List<Intermediary> intermediary) {
		this.intermediary = intermediary;
	}
}
