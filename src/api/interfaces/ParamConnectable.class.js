import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connectable from "./Connectable.class.js";

class ParamConnectable extends Connectable{

	/**
		@class InputConnectable
		@classdesc InputConnectable represents general input connectable
		@constructs
		@param {string} [type=string] type of the box (number, string, toggle, file, list)
		@param {Box} box
		@param {number} [id=generated]
	*/
	constructor(type, box, id = GeneralUtils.getId("connectable")){
		
		super(box, id);
		this.setType(type);

	}

}

export default ParamConnectable;