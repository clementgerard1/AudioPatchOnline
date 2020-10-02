import GeneralUtils from "../utils/GeneralUtils.class.js";
import Box from "./Box.class.js";

class SoundInputBox extends Box{

	#id;

	/**
		@class SoundInputBox
		@extends Box
		@classdesc Box which generate sounds datas from sound datas
		@constructs
	*/
	constructor(){

		super("sound");
		this.setGraphType("input");
	}

	/**
		Process function of the box
		@param {array} args reprents datas from Process connections
	*/
	process(args){}

}

export default SoundInputBox;