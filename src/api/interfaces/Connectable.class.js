import GeneralUtils from "../utils/GeneralUtils.class.js";

class Connectable{

	#id;
	#box;

	#value; // Value used by connection processing

	#callbacks // Callback called after process

	/**
		@class Connectable
		@classdesc Connectable represents a part of box which can be connected
		@constructs
		@param {Box} box
		@param {number} [id=generated]
	*/
	constructor(box, id = GeneralUtils.getId("connectable")){
		
		this.#box = box;

		//id sound be a number
		if(typeof id != "number") id = GeneralUtils.getId("connectable");
		this.#id = id;

		this.#value = null;
		this.#callbacks = [];

	}

	/**
		Get the id
		@returns {int} 
	*/
	getId(){
		return this.#id;
	}

	/**
		Get value of connectable
		@return value
	*/
	getValue(){
		return this.#value;
	}

	/**
		Set value of connectable
		@param value
		@return {bool} bool
	*/
	setValue(value){
		this.#value = value;
		for(let c in this.#callbacks){
			this.#callbacks[c]();
		}
		return true;
	}

	/**
		Get parent Box
		@returns {Box}
	*/
	getBox(){
		return this.#box;
	}

	/**
		Add process listener callback
		@param {function} callback
	*/
	addListener(callback){
		this.#callbacks.push(callback);
	}

}

export default Connectable;