import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connectable from "./ParamConnectable.class.js";
import ParamConnectable from "./ParamConnectable.class.js";

class ArrayConnectable extends Connectable{

	#connectables;

	#arrayType;

	/**
		@class InputConnectable
		@classdesc InputConnectable represents general input connectable
		@constructs
		@param {Box} box
		@param {number} [id=generated]
	*/
	constructor(box, id = GeneralUtils.getId("connectable")){
		
		super(box, id);
		this.#connectables = {};

		this.setType('array');
		this.#arrayType = 'text';

	}

	/**
		Add new conenctable
		@param {ParamConnectable} connectable
		@returns {bool} reprents success of operation
	*/
	addConnectable(connectable){
		if(connectable instanceof ParamConnectable){
			this.#connectables[connectable.getId()] = connectable; 
			return true;
		}else{
			return false;
		}
	}

	/**
		Remove connectable
		@param {ParamConnectable} connectable
		@returns {bool} reprents success of operation
	*/
	removeConnectable(connectable){
		if(connectable instanceof ParamConnectable && typeof this.#connectables[connectable.getId()] != "undefined"){
			delete this.#connectables[connectable.getId()]; 
			return true;
		}else{
			return false;
		}
	}

	/*
		Get all connectables
		@returns {array}
	*/
	getConnectables(){
		return this.#connectables;
	}

	/**
		Set array type
		@param {string} type
	*/
	setArrayType(type){
		this.#arrayType = type;
	}

	/**
		Get array type
		@returns {string}
	*/
	getArrayType(type){
		return this.#arrayType;
	}

}

export default ArrayConnectable;