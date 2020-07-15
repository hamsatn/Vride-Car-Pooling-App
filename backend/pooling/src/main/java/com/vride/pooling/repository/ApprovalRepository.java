package com.vride.pooling.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vride.pooling.model.DAOPoolRequest;

@Repository
public interface ApprovalRepository extends CrudRepository<DAOPoolRequest, Long> {
	Iterable<DAOPoolRequest> findByProviderId(Long providerId);
	Iterable<DAOPoolRequest> findByRiderId(Long riderId);
	List<DAOPoolRequest> findByIsApprovedAndTripId(boolean isApproved, Long tripId);
}