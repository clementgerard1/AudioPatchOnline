import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class SoundToEventProcessBox extends Box{

	#id;

	/**
		@class SoundToEventProcessBox
		@extends Box
		@classdesc Box which generate event datas from sound datas
		@constructs
	*/
	constructor(){

		super("mixte");
		this.setGraphType("process");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from Process connections
	*/
	process(args){}

}

export default SoundToEventProcessBox;