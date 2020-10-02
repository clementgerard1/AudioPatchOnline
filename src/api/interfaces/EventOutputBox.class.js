import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class EventOutputBox extends Box{

	#id;

	/**
		@class EventOutputBox
		@extends Box
		@classdesc Box which stop process of event datas
		@constructs
	*/
	constructor(){

		super("event");
		this.setGraphType("output");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from Output connections
	*/
	process(args){}

}

export default EventOutputBox;