package com.vride.pooling.representation;

import com.vride.pooling.model.DAOUser;
import com.vride.pooling.model.DAOTrip;

public class Approvals {
	private long id;
	private DAOUser rider;
	private DAOUser provider;
	private DAOTrip trip;
	private boolean isApproved;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public DAOUser getRider() {
		return rider;
	}
	public void setRider(DAOUser rider) {
		this.rider = rider;
	}
	public DAOUser getProvider() {
		return provider;
	} 
	public void setProvider(DAOUser provider) {
		this.provider = provider;
	}
	public DAOTrip getTrip() {
		return trip;
	}
	public void setTrip(DAOTrip trip) {
		this.trip = trip;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	
	
}
