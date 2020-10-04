import GeneralUtils from "../utils/GeneralUtils.class.js";

class Connection{

	#id;
	#type;

	#inputConnectable;
	#outputConnectable;

	#processCallbacks;

	/**
		@class Connection
		@classdesc Connection represents a connection between two connectables
		@constructs
		@param {InputConnectable} inputConnectable
		@param {OutputConnectable} outputConnectable
		@param {number} [id=generated]
	*/
	constructor(inputConnectable, outputConnectable, id = GeneralUtils.getId("connection")){
		this.#inputConnectable = inputConnectable;
		this.#outputConnectable = outputConnectable;
		
		//id sound be a number
		if(typeof id != "number") id = GeneralUtils.getId("connection");
		this.#id = id;

		this.#type = null;

		this.#inputConnectable.getBox().addOutputConnection(this);
		this.#outputConnectable.getBox().addInputConnection(this);

		this.#processCallbacks = [];

	}

	/**
		Get the id
		@returns {int} 
	*/
	getId(){
		return this.#id;
	}

	/**
		Process transfert of data
	*/
	process(){
		for(let p in this.#processCallbacks){
			this.#processCallbacks[p]();
		}
	}

	/**
		Get Input Connectable
		@returns {Connectable}
	*/
	getInputConnectable(){
		return	this.#inputConnectable;
	}

	/**
		Get Output Connectable
		@returns {Connectable}
	*/
	getOutputConnectable(){
		return	this.#outputConnectable;
	}

	/**
		Set the type of the connection (event, sound)
		@param {string} type
		@return
	*/
	setType(type){
		this.#type = type;
	}

	/**
		Get the type of the connection(event, sound)
		@return {string}
	*/
	getType(){
		return this.#type;
	}

	/**
		Add a callback call during process
		@param {function} callback
	*/
	addProcessCallback(callback){
		this.#processCallbacks.push(callback);
	}

	/**
		Remove a process callback
		@param {function} callback
	*/
	removeProcessCallback(callback){
		for(let p in this.#processCallbacks){
			if(this.#processCallbacks[p].toString() == callback.toString()) this.#processCallbacks.splice(p, 1);
		}
	}

}

export default Connection;