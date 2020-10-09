import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class EventToSoundProcessBox extends Box{

	#id;

	/**
		@class EventToSoundProcessBox
		@extends Box
		@classdesc Box which generate sound datas from event datas
		@constructs
	*/
	constructor(){

		super("eventToSound");
		this.setGraphType("process");
	}
	
	/**
		Process function of the box
		@param {array} args reprents datas from Process connections
	*/
	process(args){
		
	}

}

export default EventToSoundProcessBox;