import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connection from "./Connection.class.js";
import AudioManager from "../AudioManager.class.js";

class SoundConnection extends Connection{

	#id;

	/**
		@class SoundConnection
		@extends Connection
		@classdesc Connection for sound datas transfert
		@constructs
		@param {Connectable} inputConnectable
		@param {Connectable} outputConnectable
		@param {number} [id=generated]
	*/
	constructor(inputConnectable, outputConnectable, id = GeneralUtils.getId("connection")){

		super(inputConnectable, outputConnectable, id);
		this.setType("sound");

		// Web audio graph connection
		AudioManager.connect(inputConnectable.getValue(), outputConnectable.getValue());

	}

}

export default SoundConnection;