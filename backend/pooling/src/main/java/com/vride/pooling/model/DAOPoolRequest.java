package com.vride.pooling.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pool_request")
public class DAOPoolRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created_at;

	@ManyToOne
	@JoinColumn(name="rider")
	private DAOUser rider;
	
	@ManyToOne
	@JoinColumn(name="provider")
	private DAOUser provider;
	
	@ManyToOne
	@JoinColumn(name="trip_id")
	private DAOTrip trip;
	
	@Column(columnDefinition="tinyint(1) default 0")
	private boolean isApproved;

	

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
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
	
	
}