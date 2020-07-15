package com.vride.pooling.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vride.pooling.model.DAOIntermediary;

@Repository
public interface IntermediaryRepository extends CrudRepository<DAOIntermediary, Long> {
	Iterable<DAOIntermediary> findByTripId(Long tripId);
}