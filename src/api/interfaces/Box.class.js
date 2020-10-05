import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connection from "./Connection.class.js";
import Connectable from "./Connectable.class.js";

class Box{

	#id;
	#name;

	#inputConnections;
	#outputConnections;
	#connectables;
	#inputConnectables;
	#outputConnectables;
	#paramConnectables;
	#outputConnectionsProcessingOrder;

	#type;
	#graphType;

	/**
		@class Box
		@classdesc Box represents a processing node of patch graph
		@constructs
		@param {string} type Type of box (event, sound, eventToSound, soundToEvent)
		@param {number} [id=generated]
	*/
	constructor(type, id = GeneralUtils.getId("box")){

		//id sound be a number
		if(typeof id != "number") id = GeneralUtils.getId("box");
		this.#id = id;

		this.#name = "default";

		this.#inputConnections = {};
		this.#outputConnections = {};
		this.#outputConnectionsProcessingOrder = [];
		this.#connectables = {};
		this.#inputConnectables = [];
		this.#outputConnectables = [];
		this.#paramConnectables = {};

		this.#type = type;
		this.#graphType = null;

	}

	/**
		Get the id
		@returns {int} 
	*/
	getId(){
		return this.#id;
	}


	/**
		Process function of the box
		@param {array} args reprents datas from input connections
		@abstract
	*/
	process(args){}

	/**
		Force processing of the box
	*/
	forceProcess(args){
		this.process(args);
	}

	/**
		Add new input connection 
		@param {Connection} connection
		@returns {bool} reprents success of operation
	*/
	addInputConnection(connection){
		if(connection instanceof Connection && typeof this.#inputConnections[connection.getId()] == "undefined"){
			this.#inputConnections[connection.getId()] = connection; 
			return true;
		}else{
			return false;
		}
	}

	/**
		Remove input connection
		@param {Connection} connection
		@returns {bool} reprents success of operation
	*/
	removeInputConnection(connection){
		if(connection instanceof Connection && typeof this.#inputConnections[connection.getId()] != "undefined"){
			delete this.#inputConnections[connection.getId()]; 
			return true;
		}else{
			return false;
		}
	}

	/**
		Add new output connection 
		@param {Connection} connection
		@returns {bool} reprents success of operation
	*/
	addOutputConnection(connection){
		if(connection instanceof Connection && typeof this.#outputConnections[connection.getId()] == "undefined"){
			this.#outputConnections[connection.getId()] = connection; 
			this.#outputConnectionsProcessingOrder.push(connection.getId());
			return true;
		}else{
			return false;
		}
	}

	/**
		Remove output connection
		@param {Connection} connection
		@returns {bool} reprents success of operation
	*/
	removeOutputConnection(connection){
		if(connection instanceof Connection && typeof this.#outputConnections[connection.getId()] != "undefined"){
			delete this.#outputConnections[connection.getId()]; 
			this.#outputConnectionsProcessingOrder.splice(this.#outputConnectionsProcessingOrder.indexOf(connection.getId()), 1);
			return true;
		}else{
			return false;
		}
	}

	/**
		Get a list of all output connections
		@returns {Array}
	*/
	getOutputConnections(){
		return this.#outputConnections;
	}

	/**
		Add new connectable
		@param {Connectable} connectable
		@param {string} [name = id of connectable]
		@returns {bool} reprents success of operation
	*/
	addConnectable(connectable, name){
		if(connectable instanceof Connectable && typeof this.#connectables[connectable.getId()] == "undefined"){
			if(typeof name == "undefined"){
				this.#connectables[connectable.getId()] = connectable; 
			}else{
				this.#connectables[name] = connectable; 
			}
			return true;
		}else{
			return false;
		}
	}

	/**
		Get a connectable by its name
		@param {string} name
		@return {Connectable}
	*/
	getConnectableByName(name){
		return this.#connectables[name];
	}

	/**
		Remove connectable
		@param {Connectable} connectable
		@returns {bool} reprents success of operation
	*/
	removeConnectable(connectable){
		if(connectable instanceof Connectable && typeof this.#connectables[connectable.getId()] != "undefined"){
			delete this.#connectables[connectable.getId()]; 
			return true;
		}else{
			return false;
		}
	}

	/**
		Set input box connectable
		@param {int} i
		@param {Connectable} connectable
		@return {bool} 
	*/
	setInputConnectable(i, connectableName){
		const connectable = this.getConnectableByName(connectableName);
		if(!(connectable instanceof Connectable)) return false;
		this.#inputConnectables[i] = connectable;
		return true;
	}

	/**
		Set output box connectable
		@param {int} i
		@param {Connectable} connectable
		@return {bool} 
	*/
	setOutputConnectable(i, connectableName){
		const connectable = this.getConnectableByName(connectableName);
		if(!(connectable instanceof Connectable)) return false;
		this.#outputConnectables[i] = connectable;
		return true;
	}

	/**
		Set output box connectable
		@param {int} i
		@param {Connectable} connectable
		@return {bool} 
	*/
	setParamConnectable(connectableName){
		const connectable = this.getConnectableByName(connectableName);
		if(!(connectable instanceof Connectable)) return false;
		this.#paramConnectables[connectableName] = connectable;
		return true;
	}

	/**
		Get all param connectables
		@returns {array}
	*/
	getParamConnectables(){
		return this.#paramConnectables;
	}

	/**
		Get input box connectables
		@param {int} i
		@return {Connectable} or false if there is an error
	*/
	getInputConnectable(i){
		if(typeof this.#inputConnectables[i] == "undefined") return false;
		return this.#inputConnectables[i];
	}

	/**
		Get input box connectables
		@return {array} or false if there is an error
	*/
	getInputConnectables(){
		return this.#inputConnectables;
	}	

	/**
		Get output box connectables
		@param {int} i
		@return {Connectable} or false if there is an error
	*/
	getOutputConnectable(i){
		if(typeof this.#outputConnectables[i] == "undefined") return false;
		return this.#outputConnectables[i];
	}

	/**
		Get output box connectables
		@return {array} or false if there is an error
	*/
	getOutputConnectables(){
		return this.#outputConnectables;
	}	

	/**
		Set the graph type of the box (input, process, output)
		@param {string} type
		@return
	*/
	setGraphType(type){
		this.#graphType = type;
	}

	/**
		Get the type of box (event, sound)
		@returns {string}
	*/
	getType(){
		return this.#type;
	}

	/**
		Get the graph type of the box (input, process, output)
		@return {string}
	*/
	getGraphType(){
		return this.#graphType;
	}

	/**
		Set name of box
		@param {string} type
		@return
	*/
	setName(name){
		this.#name = name;
	}

	/**
		Get name of box
		@return {string}
	*/
	getName(){
		return this.#name;
	}

	/**
		Get the order of a connexion during processing
		@return {int}
	*/
	getOutputConnectionOrder(connectId){
		return this.#outputConnectionsProcessingOrder.indexOf(connectId);
	}

	/**
		Get the output order connection array
		@return {array}
	*/
	getOutputConnectionOrders(){
		return this.#outputConnectionsProcessingOrder;
	}

	/**
		Set the order of a connection
		@param {int} connectId
		@param {int} order
	*/
	setOrder(connectId, order){
		this.#outputConnectionsProcessingOrder[order] = connectId;
	}

}

export default Box;