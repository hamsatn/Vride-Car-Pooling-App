package com.vride.pooling.controller;

import org.springframework.web.bind.annotation.*;
import com.vride.pooling.repository.*;
import com.vride.pooling.model.DAOTrip;
import com.vride.pooling.model.DAOUser;
import com.vride.pooling.representation.Intermediary;
import com.vride.pooling.model.DAOIntermediary;
import com.vride.pooling.representation.Trip;
import com.vride.pooling.representation.ResponseStatus;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@CrossOrigin("*")
@RestController
public class TripController {
	
	@Autowired
	private TripRepository trip;
	
	@Autowired
	private IntermediaryRepository intermediary;
	
	@Autowired
	private UserRepository user;
	
	@Autowired
	private ApprovalRepository approval;
	
	private List<Intermediary> getIntermediaryList(Long tripId) {
		Iterable<DAOIntermediary> interData = intermediary.findByTripId(tripId);
		Iterator<DAOIntermediary> iterInter = interData.iterator();
		List<Intermediary> interList = new ArrayList<Intermediary>();
		while(iterInter.hasNext()) {
			Intermediary interObj = new Intermediary();
			DAOIntermediary med = iterInter.next();
			interObj.setId(med.getId());
			interObj.setPlace(med.getPlace());
			interObj.setStart_at(med.getStart_at());
			interList.add(interObj);
		}
		return interList;
	}
	
	@GetMapping("/trip/list")
	public List<Trip> tripList() {
		List<Trip> finalTrips = new ArrayList<Trip>();
		Iterable<DAOTrip> allTrips = trip.findAll();
		Iterator<DAOTrip> iterTrips = allTrips.iterator();
		while(iterTrips.hasNext()) {
			DAOTrip tripObj = iterTrips.next();
			Trip finalTrip = new Trip(); 
			finalTrip.setId(tripObj.getId());
			finalTrip.setSource(tripObj.getSource());
			finalTrip.setDestination(tripObj.getDestination());
			finalTrip.setStart_at(tripObj.getStart_at());
			finalTrip.setUser(tripObj.getUser());
			finalTrip.setPrice(tripObj.getPrice());
			finalTrip.setNoOfConfirmedRiders(approval.findByIsApprovedAndTripId(true, tripObj.getId()).size());
			
			List<Intermediary> interList = this.getIntermediaryList(tripObj.getId());
			
			finalTrip.setIntermediary(interList);
			finalTrips.add(finalTrip);
			
		}
		return finalTrips;
	}
	
	@GetMapping("/trip/{tripId}")
	public Trip retrieveTrip(@PathVariable(value="tripId") String id) {
		DAOTrip trp = trip.findById(Long.parseLong(id)).orElse(null);
		
		Trip tripDetail = new Trip();
		tripDetail.setId(trp.getId());
		tripDetail.setSource(trp.getSource());
		tripDetail.setDestination(trp.getDestination());
		tripDetail.setStart_at(trp.getStart_at());
		tripDetail.setUser(trp.getUser());
		tripDetail.setPrice(trp.getPrice());
		tripDetail.setNoOfConfirmedRiders(approval.findByIsApprovedAndTripId(true, trp.getId()).size());
		
		List<Intermediary> interList = this.getIntermediaryList(trp.getId());
		tripDetail.setIntermediary(interList);
		
		return tripDetail;
	}
	
	@PostMapping("/trip/add")
	public Trip createTrip(@RequestBody Trip tripObj) {
		
		// getting username from token
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		DAOUser loggedInUser = user.findByUsername(currentPrincipalName);
		
		DAOTrip trp = new DAOTrip();
		trp.setDestination(tripObj.getDestination());
		trp.setSource(tripObj.getSource());
		trp.setUser(loggedInUser);
		trp.setStart_at(tripObj.getStart_at());
		trp.setPrice(tripObj.getPrice());
		Long tripId = trip.save(trp).getId();
		trp.setId(tripId);
		tripObj.setId(tripId);
		tripObj.setUser(loggedInUser);
		
		
		for(int i=0; i<tripObj.getIntermediary().size(); i++) {
			DAOIntermediary inter = new DAOIntermediary();
			inter.setPlace(tripObj.getIntermediary().get(i).getPlace());
			inter.setStart_at(tripObj.getIntermediary().get(i).getStart_at());
			inter.setTrip(trp);
			Long intermediaryId = intermediary.save(inter).getId();
			inter.setId(intermediaryId);
			tripObj.getIntermediary().get(i).setId(inter.getId());
		}
		
		return tripObj;
	}
	
	@DeleteMapping("/trip/{tripId}")
	public ResponseStatus deleteTrip(@PathVariable(value="tripId") String id) {
		Iterable<DAOIntermediary> allIntermediaries = intermediary.findByTripId(Long.parseLong(id));
		intermediary.deleteAll(allIntermediaries);
		trip.delete(trip.findById(Long.parseLong(id)).orElse(null));
		return new ResponseStatus(200, "Delete successful");
	}
}
