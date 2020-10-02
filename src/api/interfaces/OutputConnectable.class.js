import GeneralUtils from "../utils/GeneralUtils.class.js";
import Connectable from "./Connectable.class.js";

class OutputConnectable extends Connectable{

	/**
		@class OutputConnectable
		@classdesc OutputConnectable represents general output connectable
		@constructs
		@param {Box} box
		@param {number} [id=generated]
	*/
	constructor(box, id = GeneralUtils.getId("connectable")){
		
		super(box, id);

	}

}

export default OutputConnectable;