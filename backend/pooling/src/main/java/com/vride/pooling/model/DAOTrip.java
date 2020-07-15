package com.vride.pooling.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "trip")
public class DAOTrip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String source;
	@Column
	private String destination;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date start_at;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private DAOUser user;
	
	@Column
	private float price;

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public DAOUser getUser() {
		return user;
	}

	public void setUser(DAOUser user) {
		this.user = user;
	}
	
	
}