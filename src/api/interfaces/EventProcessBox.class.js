import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class EventProcessBox extends Box{

	#id;

	/**
		@class EventProcessBox
		@extends Box
		@classdesc Box which generate new event datas from event datas
		@constructs
	*/
	constructor(){

		super("event");
		this.setGraphType("process");
	}
	
	/**
		Process function of the box
		@param {array} args reprents datas from Process connections
	*/
	process(args){}

}

export default EventProcessBox;