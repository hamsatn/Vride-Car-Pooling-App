package com.vride.pooling.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "intermediary")
public class DAOIntermediary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private String place;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date start_at;

	@ManyToOne
	@JoinColumn(name="trip_id")
	private DAOTrip trip;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public DAOTrip getTrip() {
		return trip;
	}

	public void setTrip(DAOTrip trip) {
		this.trip = trip;
	}
	
	public Date getStart_at() {
		return start_at;
	}

	public void setStart_at(Date start_at) {
		this.start_at = start_at;
	}
	
}