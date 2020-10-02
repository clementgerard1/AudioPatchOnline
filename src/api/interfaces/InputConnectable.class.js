import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connectable from "./Connectable.class.js";

class InputConnectable extends Connectable{

	/**
		@class InputConnectable
		@classdesc InputConnectable represents general input connectable
		@constructs
		@param {Box} box
		@param {number} [id=generated]
	*/
	constructor(box, id = GeneralUtils.getId("connectable")){
		
		super(box, id);

	}

}

export default InputConnectable;