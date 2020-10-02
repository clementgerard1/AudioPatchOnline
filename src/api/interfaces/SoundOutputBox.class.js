import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class SoundOutputBox extends Box{

	#id;

	/**
		@class SoundOutputBox
		@extends Box
		@classdesc Box which stop process of sound datas
		@constructs
	*/
	constructor(){

		super("sound");
		this.setGraphType("output");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from Output connections
	*/
	process(args){}

}

export default SoundOutputBox;