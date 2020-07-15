package com.vride.pooling.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vride.pooling.model.DAOTrip;

@Repository
public interface TripRepository extends CrudRepository<DAOTrip, Long> {
	
}