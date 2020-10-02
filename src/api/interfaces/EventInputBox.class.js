import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class EventInputBox extends Box{

	#id;

	/**
		@class EventInputBox
		@extends Box
		@classdesc Box which generate event datas without input datas
		@constructs
	*/
	constructor(){

		super("event");
		this.setGraphType("input");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from input connections
		@abstract
	*/
	process(args){}

}

export default EventInputBox;