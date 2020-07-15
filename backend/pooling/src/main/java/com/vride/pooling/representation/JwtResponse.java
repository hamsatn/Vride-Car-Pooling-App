package com.vride.pooling.representation;

import java.io.Serializable;

import com.vride.pooling.model.DAOUser;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private final DAOUser user;

	public JwtResponse(String jwttoken, DAOUser user) {
		this.jwttoken = jwttoken;
		this.user = user;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public DAOUser getUser() {
		return this.user;
	}
}