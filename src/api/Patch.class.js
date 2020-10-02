import EventInputBox from "./interfaces/EventInputBox.class.js";
import SoundInputBox from "./interfaces/SoundInputBox.class.js";

import GeneralUtils from "./utils/GeneralUtils.class.js";

class Patch{

	#soundInputs;
	#eventInputs;
	#id;

	/**
		@class Patch
		@classdesc Patch represents the container of all interconnected boxes 
		@param {Integer} id
		@constructs
	*/
	constructor(id = GeneralUtils.getId("patch")){

		//id sound be a number
		if(typeof id != "number") id = GeneralUtils.getId("patch");
		this.#id = id;

		this.#soundInputs = {};
		this.#eventInputs = {};

	}

	/**
		Get the id
		@returns {int} 
	*/
	getId(){
		return this.#id;
	}

	/**
		Add new input box 
		@param {EventInputBox|SoundInputBox} box 
		@returns {bool} reprents success of operation
	*/
	addInput(box){
		if(box instanceof EventInputBox && typeof this.#eventInputs[box.getId()] == "undefined"){
			this.#eventInputs[box.getId()] = box; 
			return true;
		}else if(box instanceof SoundInputBox  && typeof this.#soundInputs[box.getId()] == "undefined"){
			this.#soundInputs[box.getId()] = box;
			return true;
		}else{
			return false;
		}
	}

	/**
		Remove input box 
		@param {EventInputBox|SoundInputBox} box 
		@returns {bool} reprents success of operation
	*/
	removeInput(box){
		if(box instanceof EventInputBox && typeof this.#eventInputs[box.getId()] != "undefined"){
			delete this.#eventInputs[box.getId()]; 
			return true;
		}else if(box instanceof SoundInputBox  && typeof this.#soundInputs[box.getId()] != "undefined"){
			delete this.#soundInputs[box.getId()];
			return true;
		}else{
			return false;
		}
	}

	/**
		Trigger all event input boxes
	*/
	process(){
		for(let e in this.#eventInputs){
			this.#eventInputs[e].process();
		}
	}

}

export default Patch;