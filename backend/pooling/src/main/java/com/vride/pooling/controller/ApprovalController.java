package com.vride.pooling.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.vride.pooling.model.DAOPoolRequest;
import com.vride.pooling.model.DAOTrip;
import com.vride.pooling.model.DAOUser;
import com.vride.pooling.repository.ApprovalRepository;
import com.vride.pooling.repository.TripRepository;
import com.vride.pooling.repository.UserRepository;
import com.vride.pooling.representation.Approvals;

@RestController
@CrossOrigin
public class ApprovalController {
	
	@Autowired
	private UserRepository user;
	
	@Autowired
	private TripRepository trip;
	
	@Autowired
	private ApprovalRepository approval;
	
	@GetMapping("/approval/list")
	public List<Approvals> getApprovalList() {
		// getting username from token
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		DAOUser loggedInUser = user.findByUsername(currentPrincipalName);
		String userType = loggedInUser.getUserType();
		
		List<Approvals> allApprovals = new ArrayList<Approvals>();
		Iterable<DAOPoolRequest> fetchedPoolRequests;
		
		if (userType.equalsIgnoreCase("PROVIDER")) {
			fetchedPoolRequests = approval.findByProviderId(loggedInUser.getId()); 
		} else {
			fetchedPoolRequests = approval.findByRiderId(loggedInUser.getId());
		}
		
		Iterator<DAOPoolRequest> iter = fetchedPoolRequests.iterator();
		while(iter.hasNext()) {
			DAOPoolRequest req = iter.next();
			Approvals appr = new Approvals();
			appr.setId(req.getId());
			appr.setRider(req.getRider());
			appr.setProvider(req.getProvider());
			appr.setTrip(req.getTrip());
			appr.setApproved(req.isApproved());
			allApprovals.add(appr);
		}
		
		return allApprovals;
	}
	
	@PostMapping("/approval/{tripId}/send")
	public DAOPoolRequest sendRequest(@PathVariable(value="tripId") String id) {
		// getting username from token
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		DAOUser loggedInUser = user.findByUsername(currentPrincipalName);
		
		DAOTrip tripDetails = trip.findById(Long.parseLong(id)).orElse(null);
		
		DAOPoolRequest appr = new DAOPoolRequest();
		appr.setRider(loggedInUser);
		appr.setApproved(false);
		appr.setTrip(tripDetails);
		appr.setProvider(tripDetails.getUser());
		Date createdAt = approval.save(appr).getCreated_at();
		appr.setCreated_at(createdAt);
		
		return appr;
	}
	
	@PostMapping("/approval/{approvalId}/approve")
	public DAOPoolRequest approveRequest(@PathVariable(value="approvalId") String id) {
		
		DAOPoolRequest appr = approval.findById(Long.parseLong(id)).orElse(null);
		appr.setApproved(true);
		approval.save(appr);
		
		return appr;
		
	}
}
