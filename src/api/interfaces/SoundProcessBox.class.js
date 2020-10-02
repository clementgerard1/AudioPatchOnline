import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class SoundProcessBox extends Box{

	#id;

	/**
		@class SoundProcessBox
		@extends Box
		@classdesc Box which generate new sound datas from sound datas
		@constructs
	*/
	constructor(){

		super("sound");
		this.setGraphType("process");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from Process connections
	*/
	process(args){}

}

export default SoundProcessBox;