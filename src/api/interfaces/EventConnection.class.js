import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connection from "./Connection.class.js";

class EventConnection extends Connection{

	#id;

	#hot;

	/**
		@class EventConnection
		@extends Connection
		@classdesc Connection for event datas transfert
		@constructs
		@param {Connectable} inputConnectable
		@param {Connectable} outputConnectable
		@param {number} [id=generated]
	*/
	constructor(inputConnectable, outputConnectable, id = GeneralUtils.getId("connection")){

		super(inputConnectable, outputConnectable, id);

		this.setType("event");
		this.#hot = true;

	}

	/**
		Process transfert of data
	*/
	process(){
		this.getOutputConnectable().setValue(this.getInputConnectable().getValue());
		if(this.#hot) this.getOutputConnectable().getBox().forceProcess();
		super.process();
	}

	/**
		Return hot connection state
		@returns {boolean}
	*/
	isHot(){
		return this.#hot;
	}

	/**
		Set hot connection state
		@param {boolean} bool
	*/
	setHot(bool){
		this.#hot = bool;
	}

}

export default EventConnection;